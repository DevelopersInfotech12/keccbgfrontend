'use client';

/**
 * StateProject.jsx
 * Photoreal 3D globe (three.js), oriented to face India by default.
 * Rotation is clamped to a small tilt cone around India. Zoom is enabled and
 * bounded so the camera can never get close enough to clip the sphere, while
 * the camera is auto-framed so the full sphere fits on load, on any aspect
 * ratio. Section background is deep-space themed (starfield + nebula + drifting motes).
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { X, MapPin, Globe2 } from 'lucide-react';

// Site palette: teal (default) + orange (selected / accents) — matches WhyUs/Products
const TEAL_LIGHT = 0x3e7b8c;   // lighter teal, visible marker/glow against dark globe
const TEAL_LIGHT_GLOW = 0x5aa0b3;
const ORANGE = 0xff7d44;       // selected marker / accent
const EARTH_TEXTURE_URL = 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg';

const INDIA_CENTER = { lat: 22.5937, lon: 78.9629 };

const STATES = [
  {
    id: 'delhi', name: 'Delhi', lat: 28.6139, lon: 77.209,
    projects: [
      { title: 'Okhla Waste-to-Energy Plant', tag: 'Waste to X', year: 2023, desc: 'Municipal solid waste converted into clean electricity for the capital grid.' },
      { title: 'Delhi Biogas Recovery Unit', tag: 'Renewable Gas', year: 2022, desc: 'Organic waste digestion facility supplying compressed biogas to city transport.' },
    ],
  },
  {
    id: 'maharashtra', name: 'Maharashtra', lat: 19.076, lon: 72.8777,
    projects: [
      { title: 'Deonar EfW Facility', tag: 'Waste to X', year: 2024, desc: "Energy-from-waste plant serving Mumbai's largest landfill site." },
      { title: 'Pune Resource Recovery Park', tag: 'Development & Financing', year: 2021, desc: 'PPP-financed circular economy park for industrial waste streams.' },
    ],
  },
  {
    id: 'karnataka', name: 'Karnataka', lat: 12.9716, lon: 77.5946,
    projects: [
      { title: 'Bengaluru Digital Plant Twin', tag: 'Digital Solutions', year: 2024, desc: 'AI-driven monitoring platform optimising plant uptime in real time.' },
      { title: 'Mandur Bioenergy Complex', tag: 'Renewable Gas', year: 2022, desc: 'Converts sorted organic waste into grid-injected biomethane.' },
    ],
  },
  {
    id: 'tamil-nadu', name: 'Tamil Nadu', lat: 13.0827, lon: 80.2707,
    projects: [
      { title: 'Chennai Coastal EfW Plant', tag: 'Engineering & Construction', year: 2023, desc: 'Thermal treatment facility built to withstand coastal operating conditions.' },
    ],
  },
  {
    id: 'west-bengal', name: 'West Bengal', lat: 22.5726, lon: 88.3639,
    projects: [
      { title: 'Kolkata O&M Contract', tag: 'O&M', year: 2020, desc: 'Long-term operations and maintenance for the regional treatment plant.' },
    ],
  },
  {
    id: 'gujarat', name: 'Gujarat', lat: 23.0225, lon: 72.5714,
    projects: [
      { title: 'Ahmedabad Renewable Gas Hub', tag: 'Renewable Gas', year: 2023, desc: 'Regional biogas upgrading hub feeding the city gas network.' },
      { title: 'Gujarat Industrial Waste Line', tag: 'Waste to X', year: 2021, desc: 'Dedicated processing line for industrial by-product waste streams.' },
    ],
  },
  {
    id: 'telangana', name: 'Telangana', lat: 17.385, lon: 78.4867,
    projects: [
      { title: 'Hyderabad EfW Expansion', tag: 'Engineering & Construction', year: 2024, desc: 'Capacity expansion adding a second treatment line to the existing plant.' },
    ],
  },
  {
    id: 'rajasthan', name: 'Rajasthan', lat: 26.9124, lon: 75.7873,
    projects: [
      { title: 'Jaipur Development Financing', tag: 'Development & Financing', year: 2022, desc: 'Structured project financing for a new resource-recovery facility.' },
    ],
  },
  {
    id: 'uttar-pradesh', name: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462,
    projects: [
      { title: 'Lucknow Waste to X Plant', tag: 'Waste to X', year: 2023, desc: 'High-volume thermal treatment plant serving the metro region.' },
    ],
  },
  {
    id: 'punjab', name: 'Punjab', lat: 30.7333, lon: 76.7794,
    projects: [
      { title: 'Chandigarh Biogas Pilot', tag: 'Renewable Gas', year: 2020, desc: 'Pilot facility converting agricultural residue into biogas.' },
    ],
  },
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function toScreenPosition(object, camera, domElement) {
  const vector = new THREE.Vector3();
  object.getWorldPosition(vector);
  vector.project(camera);
  const halfW = domElement.clientWidth / 2;
  const halfH = domElement.clientHeight / 2;
  return { x: vector.x * halfW + halfW, y: -(vector.y * halfH) + halfH };
}

// Deterministic pseudo-random star field (stable across renders, no hydration mismatch)
function makeStars(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: rand() * 100,
    left: rand() * 100,
    size: rand() * 1.6 + 0.6,
    delay: rand() * 6,
    duration: rand() * 3 + 2.5,
    opacity: rand() * 0.5 + 0.4,
  }));
}

const SMALL_STARS = makeStars(160, 17);
const MED_STARS = makeStars(50, 53);
const BIG_STARS = makeStars(18, 91);

export default function StateProject() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const sceneApiRef = useRef(null);

  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webglError, setWebglError] = useState(false);

  const handleClear = useCallback(() => {
    sceneApiRef.current?.clearSelection?.();
    setSelectedState(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      setWebglError(true);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const radius = 1;
    const SPHERE_R = radius * 1.06; // include atmosphere shell

    // Frame the camera so the whole sphere fits the viewport on load, on ANY
    // aspect ratio. Zoom is then allowed within a bounded range computed from
    // that fit distance, so the user can scroll/pinch to zoom but can never
    // get close enough for the sphere to be clipped by the viewport edges.
    let fitDistance = radius * 3;
    let cameraInitialized = false;
    const frameCamera = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      const aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      const vFov = THREE.MathUtils.degToRad(camera.fov);
      // vertical fit uses the sphere silhouette angle (asin), horizontal too
      const distV = SPHERE_R / Math.sin(vFov / 2);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
      const distH = SPHERE_R / Math.sin(hFov / 2);
      fitDistance = Math.max(distV, distH) * 1.16; // breathing room

      renderer.setSize(w, h);

      if (controlsRef) {
        // Zoom-in limit stays comfortably outside the sphere surface; zoom-out
        // limit keeps the globe from shrinking to a speck.
        controlsRef.minDistance = fitDistance * 0.45;
        controlsRef.maxDistance = fitDistance * 1.7;
      }

      if (!cameraInitialized) {
        camera.position.setLength(fitDistance);
        cameraInitialized = true;
      } else if (controlsRef) {
        // Preserve the user's current zoom level across resizes; just clamp
        // it into the (possibly new) bounds instead of snapping back to fit.
        const currentLen = camera.position.length();
        const clamped = THREE.MathUtils.clamp(currentLen, controlsRef.minDistance, controlsRef.maxDistance);
        if (clamped !== currentLen) camera.position.setLength(clamped);
      }
    };

    container.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'none';

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.1);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    const orientationAnchor = new THREE.Group();
    scene.add(orientationAnchor);
    const spinPivot = new THREE.Group();
    orientationAnchor.add(spinPivot);

    const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x0a1f26, shininess: 8 });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), earthMaterial);
    spinPivot.add(globe);

    // Orient India to face camera, north pole up.
    const indiaDir = latLonToVector3(INDIA_CENTER.lat, INDIA_CENTER.lon, 1).normalize();
    const worldUp = new THREE.Vector3(0, 1, 0);
    const upLocal = worldUp.clone().sub(indiaDir.clone().multiplyScalar(worldUp.dot(indiaDir)));
    if (upLocal.lengthSq() < 1e-6) upLocal.set(0, 0, 1);
    upLocal.normalize();
    const rightLocal = new THREE.Vector3().crossVectors(upLocal, indiaDir).normalize();
    const basis = new THREE.Matrix4().makeBasis(rightLocal, upLocal, indiaDir);
    orientationAnchor.quaternion.setFromRotationMatrix(basis).invert();

    let earthTexture = null;
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
      EARTH_TEXTURE_URL,
      (tex) => {
        earthTexture = tex;
        earthMaterial.map = tex;
        earthMaterial.color.set(0xffffff);
        earthMaterial.needsUpdate = true;
        setLoading(false);
      },
      undefined,
      () => setLoading(false)
    );

    // Atmosphere glow (teal)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.05, 64, 64),
      new THREE.MeshBasicMaterial({ color: TEAL_LIGHT_GLOW, transparent: true, opacity: 0.14, side: THREE.BackSide })
    );
    scene.add(atmosphere);

    // Markers + pulse rings
    const markerMeshes = [];
    const ringMeshes = [];
    STATES.forEach((state) => {
      const pos = latLonToVector3(state.lat, state.lon, radius * 1.01);
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 16, 16),
        new THREE.MeshBasicMaterial({ color: TEAL_LIGHT })
      );
      marker.position.copy(pos);
      marker.userData.state = state;
      globe.add(marker);
      markerMeshes.push(marker);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.022, 0.03, 32),
        new THREE.MeshBasicMaterial({ color: TEAL_LIGHT_GLOW, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      );
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      globe.add(ring);
      ringMeshes.push(ring);
    });

    // Controls: tilt + zoom enabled, bounded so the sphere is never clipped.
    const controls = new OrbitControls(camera, renderer.domElement);
    const controlsRef = controls;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.zoomSpeed = 0.7;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.5;
    controls.autoRotate = false;
    controls.minAzimuthAngle = -0.5;
    controls.maxAzimuthAngle = 0.5;
    controls.minPolarAngle = Math.PI / 2 - 0.4;
    controls.maxPolarAngle = Math.PI / 2 + 0.4;

    frameCamera();

    let interacting = false;
    const onControlsStart = () => { interacting = true; };
    const onControlsEnd = () => { interacting = false; };
    controls.addEventListener('start', onControlsStart);
    controls.addEventListener('end', onControlsEnd);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let selectedMarker = null;
    let downPos = null;
    let downTime = 0;

    const setNdc = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerDown = (e) => {
      downPos = { x: e.clientX, y: e.clientY };
      downTime = performance.now();
    };

    const onPointerUp = (e) => {
      if (!downPos) return;
      const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
      const elapsed = performance.now() - downTime;
      downPos = null;
      if (dist > 6 || elapsed > 400) return;
      setNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(markerMeshes, false)[0];
      if (!hit) return;
      if (selectedMarker) selectedMarker.material.color.set(TEAL_LIGHT);
      hit.object.material.color.set(ORANGE);
      selectedMarker = hit.object;
      setSelectedState(hit.object.userData.state);
    };

    const onPointerMove = (e) => {
      setNdc(e.clientX, e.clientY);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObjects(markerMeshes, false)[0];
      if (hit) {
        renderer.domElement.style.cursor = 'pointer';
        const p = toScreenPosition(hit.object, camera, renderer.domElement);
        if (tooltipRef.current) {
          tooltipRef.current.textContent = hit.object.userData.state.name;
          tooltipRef.current.style.transform = `translate(${p.x}px, ${p.y - 14}px) translate(-50%, -100%)`;
          tooltipRef.current.style.opacity = '1';
        }
      } else {
        renderer.domElement.style.cursor = '';
        if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointermove', onPointerMove);

    sceneApiRef.current = {
      clearSelection: () => {
        if (selectedMarker) {
          selectedMarker.material.color.set(TEAL_LIGHT);
          selectedMarker = null;
        }
      },
    };

    const clock = new THREE.Clock();
    let elapsed = 0;
    let swayTime = 0;
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      elapsed += delta;
      ringMeshes.forEach((ring, i) => {
        const phase = (elapsed * 0.9 + i * 0.35) % 1.5;
        const scale = 1 + phase * 1.6;
        ring.scale.setScalar(scale);
        ring.material.opacity = Math.max(0, 0.5 * (1 - phase / 1.5));
      });
      if (!interacting) {
        swayTime += delta;
        spinPivot.rotation.y = Math.sin(swayTime * 0.35) * 0.12;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resizeObserver = new ResizeObserver(frameCamera);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      controls.removeEventListener('start', onControlsStart);
      controls.removeEventListener('end', onControlsEnd);
      controls.dispose();
      if (earthTexture) earthTexture.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: '#020207' }}
    >
      <style>{`
        @keyframes swp-twinkle {
          0%, 100% { opacity: var(--swp-op, .6); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes swp-drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(8px, -14px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes swp-shoot {
          0% { transform: translate(0, 0) rotate(-32deg); opacity: 0; }
          6% { opacity: 1; }
          22% { transform: translate(-320px, 200px) rotate(-32deg); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes swp-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes swp-spin-slow-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>

      {/* Deep black space base + soft galactic core */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 22% 8%, #241549 0%, #0c0a24 32%, #030109 62%, #000000 100%)' }} />

      {/* Slow-rotating nebula swirls (conic gradients read as gassy clouds) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[62rem] w-[62rem] opacity-40 blur-[90px]"
        style={{
          background: 'conic-gradient(from 90deg, rgba(124,58,237,0.35), rgba(62,123,140,0.05) 30%, transparent 55%, rgba(255,125,68,0.18) 75%, rgba(124,58,237,0.35))',
          animation: 'swp-spin-slow 90s linear infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/3 top-1/4 h-[50rem] w-[50rem] opacity-30 blur-[100px]"
        style={{
          background: 'conic-gradient(from 200deg, rgba(90,160,179,0.35), transparent 40%, rgba(124,58,237,0.22) 65%, transparent 85%, rgba(90,160,179,0.35))',
          animation: 'swp-spin-slow-rev 120s linear infinite',
        }}
      />

      {/* Nebula color glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.32) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(62,123,140,0.26) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/4 bottom-0 h-[26rem] w-[26rem] rounded-full blur-[130px]" style={{ background: 'radial-gradient(circle, rgba(255,125,68,0.16) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute right-1/4 -bottom-24 h-72 w-72 rounded-full blur-[110px]" style={{ background: 'radial-gradient(circle, rgba(90,160,179,0.2) 0%, transparent 70%)' }} />

      {/* Distant micro-dust (fine grain via tiny repeating dots) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1px 1px at 33% 66%, rgba(255,255,255,0.4) 50%, transparent 51%), radial-gradient(1px 1px at 61% 24%, rgba(255,255,255,0.5) 50%, transparent 51%), radial-gradient(1px 1px at 82% 78%, rgba(255,255,255,0.4) 50%, transparent 51%)',
          backgroundSize: '160px 160px, 190px 190px, 140px 140px, 210px 210px',
        }}
      />

      {/* Twinkling starfield */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SMALL_STARS.map((s) => (
          <span
            key={`sm-${s.id}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--swp-op': s.opacity,
              animation: `swp-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {MED_STARS.map((s) => (
          <span
            key={`md-${s.id}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size + 0.8}px`,
              height: `${s.size + 0.8}px`,
              boxShadow: '0 0 4px 0.5px rgba(255,255,255,0.6)',
              '--swp-op': s.opacity,
              animation: `swp-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {BIG_STARS.map((s) => (
          <span
            key={`lg-${s.id}`}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size + 1.6}px`,
              height: `${s.size + 1.6}px`,
              background: 'white',
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.9)',
              '--swp-op': s.opacity,
              animation: `swp-twinkle ${s.duration + 1}s ease-in-out ${s.delay}s infinite, swp-drift ${s.duration * 3}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
        {/* Occasional shooting stars */}
        <span className="absolute h-px w-28 rounded-full bg-gradient-to-r from-white to-transparent" style={{ top: '16%', left: '72%', animation: 'swp-shoot 8s ease-in 1s infinite' }} />
        <span className="absolute h-px w-20 rounded-full bg-gradient-to-r from-white to-transparent" style={{ top: '52%', left: '88%', animation: 'swp-shoot 10s ease-in 4.5s infinite' }} />
        <span className="absolute h-px w-16 rounded-full bg-gradient-to-r from-white to-transparent" style={{ top: '78%', left: '40%', animation: 'swp-shoot 11s ease-in 7s infinite' }} />
      </div>

      {/* Vignette to focus content, deepen edges to black */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 220px 60px rgba(0,0,0,0.75)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
        {/* Globe */}
        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:w-1/2">
          <div className="relative aspect-square w-full">
            {!webglError && (
              <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
            )}
            <div
              ref={tooltipRef}
              className="pointer-events-none absolute left-0 top-0 z-20 rounded-lg border border-white/10 bg-ink-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-150"
            />
            {loading && !webglError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-white/55">Loading globe…</span>
              </div>
            )}
            {webglError && (
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-sm text-white/60">3D view isn&apos;t supported in this browser. Try a recent Chrome, Firefox, Safari or Edge.</p>
              </div>
            )}
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: '#FF7D44' }} />
            <p className="text-xs font-medium tracking-wide text-white/45">
              Drag to tilt • Scroll to zoom • Tap a glowing marker to explore
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-1/2">
          {/* Heading */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm" style={{ color: '#FF7D44' }}>
            <Globe2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            Our footprint
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[2.5rem]">
            <span className="text-white">Plants running</span>
            <br />
            <span style={{ color: '#FF7D44' }}>across India.</span>
          </h2>

          <div
            className="mt-8 rounded-[1.75rem] border border-white/15 p-6 backdrop-blur-sm transition-transform duration-500 sm:p-8 [transform-style:preserve-3d] hover:[transform:perspective(1200px)_rotateY(-2deg)_rotateX(1deg)_translateZ(6px)]"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 95%, rgba(255,255,255,0.03) 100%)',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 1px 0 rgba(255,255,255,0.12) inset',
            }}
          >
            {selectedState ? (
              <>
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: '#FF7D44' }}>
                      Selected state
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold text-white sm:text-3xl">{selectedState.name}</h3>
                    <p className="mt-1 text-[13px] text-white/45">
                      {selectedState.projects.length} project{selectedState.projects.length > 1 ? 's' : ''} running
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear selection"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2"
                    style={{ '--tw-ring-color': '#3E7B8C' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FF7D44'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {selectedState.projects.map((proj) => (
                    <div
                      key={proj.title}
                      className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07]"
                      style={{ '--hover-border': '#FF7D4466' }}
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display text-[15px] font-semibold text-white">{proj.title}</span>
                        <span className="text-xs font-medium text-white/45">{proj.year}</span>
                      </div>
                      <span className="mb-2.5 inline-block rounded-full px-3 py-1 text-[11px] font-semibold" style={{ background: 'rgba(255,125,68,0.15)', color: '#FFB088' }}>
                        {proj.tag}
                      </span>
                      <p className="text-[13.5px] leading-relaxed text-white/65">{proj.desc}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: '#FF7D44', boxShadow: '0 16px 30px -12px rgba(255,125,68,0.7)' }}>
                  <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
                </span>
                <p className="font-display text-xl font-semibold text-white">Pick a state on the globe</p>
                <p className="max-w-xs text-[14px] leading-relaxed text-white/55">
                  Rotate the earth and tap any glowing marker to see the projects running in that state.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}