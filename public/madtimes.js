import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://lspheeaxmypvigtvuwjw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzcGhlZWF4bXlwdmlndHZ1d2p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzM2OTMsImV4cCI6MjA2NTcwOTY5M30.IPFrQCbOQoJbhV-U1AiPLCgv9CytZEmOp4gtn7cDwfA'
);

function renderAuthUI(scene) {
  scene.innerHTML = `
    <div style="max-width:400px;margin:40px auto;padding:20px;background:#111;border-radius:12px;color:#fff;font-family:sans-serif;text-align:center">
      <h2>🔐 MAD TIMES Login</h2>
      <input id="email" type="email" placeholder="Email" style="width:100%;padding:8px;margin-bottom:10px;border-radius:6px;border:none;" />
      <input id="password" type="password" placeholder="Password" style="width:100%;padding:8px;margin-bottom:10px;border-radius:6px;border:none;" />
      <div style="display:flex;justify-content:space-between;">
        <button id="loginBtn" style="flex:1;margin-right:5px;">Login</button>
        <button id="signupBtn" style="flex:1;margin-left:5px;">Sign Up</button>
      </div>
      <p id="auth-msg" style="margin-top:15px;color:#f80;"></p>
    </div>
  `;

  document.getElementById('loginBtn').onclick = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    });
    document.getElementById('auth-msg').innerText = error ? `❌ ${error.message}` : '✅ Logged in!';
    location.reload();
  };

  document.getElementById('signupBtn').onclick = async () => {
    const { error } = await supabase.auth.signUp({
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    });
    document.getElementById('auth-msg').innerText = error ? `❌ ${error.message}` : '✅ Signed up!';
  };
}

function renderWelcomeUI(scene, user) {
  scene.innerHTML = `
    <div style="text-align:center;margin-top:40px;color:lime;font-size:18px;">
      ✅ Welcome, ${user.email}
      <br/><br/>
      <button id="logoutBtn" style="padding:8px 20px;margin-top:10px;">Log Out</button>
    </div>
  `;

  document.getElementById('logoutBtn').onclick = async () => {
    await supabase.auth.signOut();
    location.reload();
  };
}

function watchScene() {
  const observer = new MutationObserver(async () => {
    const scene = document.querySelector('#kn-scene_86');
    if (scene && !scene.dataset.loaded) {
      scene.dataset.loaded = 'true';

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        renderWelcomeUI(scene, session.user);
      } else {
        renderAuthUI(scene);
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  watchScene();
});

console.log('🔥 MADTIMES script loaded');

window.fetchAndRenderCards = fetchAndRenderCards;
window.init = init;


