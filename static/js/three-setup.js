import * as THREE from 'three';

// Initialize scene, camera, and renderer
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
});

// Configure renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Camera position
camera.position.z = 30;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

// Create arrays for position and colors
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

// Set main color palette
const palette = [
    new THREE.Color(0x6c63ff), // Primary color
    new THREE.Color(0x00d9ff), // Tertiary color
    new THREE.Color(0xff5757)  // Secondary color
];

// Fill positions and colors arrays
for (let i = 0; i < particlesCount * 3; i += 3) {
    // Positions - create a sphere of particles
    const radius = Math.random() * 30 + 10;
    const phi = Math.acos(-1 + Math.random() * 2);
    const theta = Math.random() * Math.PI * 2;
    
    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);
    
    // Colors - randomly select from palette
    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
}

// Set attributes
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Create material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.2,
    sizeAttenuation: true,
    transparent: true,
    vertexColors: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Create points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Create central sphere
const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x6c63ff,
    wireframe: true
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create directional light
const directionalLight = new THREE.DirectionalLight(0x6c63ff, 1);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Mouse interaction
const mouse = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) => {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Resize event handling
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate particles
    particles.rotation.x = elapsedTime * 0.05;
    particles.rotation.y = elapsedTime * 0.03;
    
    // Rotate sphere
    sphere.rotation.y = elapsedTime * 0.2;
    sphere.rotation.z = elapsedTime * 0.1;
    
    // Mouse interaction - subtle camera movement
    camera.position.x = mouse.x * 2;
    camera.position.y = mouse.y * 2;
    camera.lookAt(scene.position);
    
    // Pulse the sphere
    const pulse = Math.sin(elapsedTime) * 0.1 + 1;
    sphere.scale.set(pulse, pulse, pulse);
    
    // Render
    renderer.render(scene, camera);
    
    // Call animate recursively
    requestAnimationFrame(animate);
}

// Start animation
animate();