---
title: Securely Deploy Vibe-Coded Apps — Diode Vibe
description: "Deploy vibe-coded apps off the public internet. No public URL, no exposed database, no auth code for AI to get wrong. Private by default with Diode Vibe."
layout: page-collab-a
permalink: /lp/vibe-deploy/
noindex: false

collab_a_hero:
  heading: Securely Deploy Vibe-Coded Apps.
  subheading: |
    **Build. Deploy. Control Access.**

    Go from idea to operational app without managing infrastructure. Diode Vibe publishes your vibe-coded app privately to your team, or publicly.
  btn_download: GET STARTED
  btn_url: "https://vibe.diode.io"
---

<style>
/* ---- collab-a base ---- */
:root{--collab-a-white:#fff;--collab-a-margin-sm:11.2px;--collab-a-margin-md:22.4px}
body.page--collab-a{min-height:100%;height:auto;margin:0;display:flex;flex-direction:column;overflow-x:hidden}
body.page--collab-a h1.collab-a-title{font-size:44.8px;font-weight:500;line-height:0.9}
.collab-a{container:collab-a / inline-size;position:relative;display:flex;flex-direction:column;gap:16.8px;color:#fff;font-family:'Poppins',sans-serif;letter-spacing:0;background-color:#000;background-image:url('/assets/img/hero/default.webp');background-size:cover;background-position:center;background-repeat:no-repeat;padding:51.1px 42px 42.7px 42px;padding-top:100px;overflow:visible;min-height:100vh;min-height:750px;height:auto;flex:1;box-sizing:border-box}
.collab-a::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;min-height:100%;background-color:rgba(255,255,255,0);pointer-events:none;z-index:0}
.collab-a > *{position:relative;z-index:1}
.collab-a a{cursor:pointer}
.collab-a-bg{display:contents}
.diode-mesh{position:absolute;bottom:0;right:-25.2px;width:calc(100% - 0px);max-width:304.5px}
.collab-a-row1{position:relative;z-index:5;margin-left:28px;margin-top:0;display:flex;align-items:flex-start;gap:60px;align-self:center;color:#fff;font-weight:300;flex-grow:1}
.collab-a-col-left{position:relative;width:480px;display:flex;flex-direction:column;gap:0;flex-shrink:0;padding-top:44.8px;padding-bottom:93.1px;align-items:center;align-self:center}
.collab-a-col-right{margin-top:70.7px;width:400px;display:flex;flex-direction:column;gap:23.1px;flex-shrink:0;text-align:left}
.collab-a-title{margin:-1.4px 7px 0 -1.4px;color:var(--collab-a-white,#fff)}
.collab-a-subtitle{margin-left:2.1px;margin-right:-3.5px;font-size:16px;line-height:1.074}
.collab-a-subtitle strong,.collab-a-subtitle b{font-size:16.8px;font-weight:700}
.collab-a-btn-download{margin-left:2.1px;margin-top:9.1px;display:flex;justify-content:center;align-self:flex-start;font-size:14px;font-style:normal;line-height:1.55;letter-spacing:0.28px;text-align:center;background-color:#f15d2f;padding:7px 18px 7.7px 18px;border-radius:21px;border:0;cursor:pointer;color:#fff;text-decoration:none;font-family:inherit;white-space:nowrap}
.collab-a-btn-download:hover{filter:brightness(1.2)}
.collab-a-line{margin-left:2.1px;margin-top:12.6px;width:120.4px;height:0;flex-shrink:0;align-self:flex-start;border-top:2px solid #a7a9ac}
.hero-laptop-wrap{position:relative;z-index:2;width:110%;max-width:528px;margin-left:-5%}
.hero-laptop-wrap svg{width:100%;height:auto;display:block;filter:drop-shadow(0 8px 32px rgba(0,0,0,0.25))}
.lp-tool-badges{margin-left:2.1px;margin-top:18px;display:flex;flex-wrap:wrap;gap:8px;align-self:flex-start}
.lp-tool-badge{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:400;color:rgba(255,255,255,0.6);background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:4px 10px;font-family:'IBM Plex Mono','Poppins',monospace;letter-spacing:0.3px}
.lp-sections{position:relative;z-index:2;display:flex;flex-direction:column;gap:0;width:100vw;margin-left:calc(-50vw + 50%);color:#fff;font-family:'Poppins',sans-serif}
.lp-inner{max-width:1100px;margin:0 auto;width:100%}
.lp-section-heading{font-size:32px;font-weight:500;line-height:1.2;color:#fff;margin:0 0 16px 0}
.lp-section-sub{font-size:16px;font-weight:300;line-height:1.65;color:rgba(255,255,255,0.7);max-width:620px;margin:0 0 36px 0}
.lp-pillars{border-top:1px solid rgba(255,255,255,0.1);border-bottom:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);padding:48px 42px}
.lp-pillars-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:0}
.lp-pillar{padding:8px 32px 8px 0}
.lp-pillar:not(:last-child){border-right:1px solid rgba(255,255,255,0.18);margin-right:32px}
.lp-pillar-icon{margin-bottom:14px}
.lp-pillar-title{font-size:18px;font-weight:600;color:#fff;margin:0 0 10px 0;letter-spacing:0}
.lp-pillar-text{font-size:16px;font-weight:300;line-height:1.65;color:rgba(255,255,255,0.7);margin:0}
.lp-comparison{padding:60px 42px;background:rgba(0,0,0,0.15);border-bottom:1px solid rgba(255,255,255,0.1)}
.lp-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid rgba(255,255,255,0.12);border-radius:6px;overflow:hidden}
.lp-compare-col{padding:32px 36px}
.lp-compare-them{background:rgba(0,0,0,0.16)}
.lp-compare-us{background:rgba(241,93,47,0.11);border-left:1px solid rgba(241,93,47,0.25)}
.lp-compare-label{font-size:18px;font-weight:600;letter-spacing:0;text-transform:none;color:#fff;margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1)}
.lp-compare-label-us{color:#f15d2f;border-bottom-color:rgba(241,93,47,0.25)}
.lp-compare-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px}
.lp-compare-bad,.lp-compare-good{font-size:16px;font-weight:300;line-height:1.5;padding-left:26px;position:relative}
.lp-compare-bad::before,.lp-compare-good::before{content:'';position:absolute;left:0;top:3px;width:15px;height:15px;background-size:contain;background-repeat:no-repeat}
.lp-compare-bad{color:rgba(255,255,255,0.75)}
.lp-compare-bad::before{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none'%3E%3Ccircle cx='7' cy='7' r='6' stroke='%23e05252' stroke-width='1.2'/%3E%3Cline x1='4.5' y1='4.5' x2='9.5' y2='9.5' stroke='%23e05252' stroke-width='1.5' stroke-linecap='round'/%3E%3Cline x1='9.5' y1='4.5' x2='4.5' y2='9.5' stroke='%23e05252' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")}
.lp-compare-good{color:#fff}
.lp-compare-good::before{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 14' fill='none'%3E%3Ccircle cx='7' cy='7' r='6' stroke='%23f15d2f' stroke-width='1.2'/%3E%3Cpath d='M4.5 7L6.5 9L9.5 5' stroke='%23f15d2f' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}
.lp-usecases{padding:60px 42px;background:rgba(255,255,255,0.03);border-bottom:1px solid rgba(255,255,255,0.1)}
.lp-usecase-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lp-usecase-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:22px 20px;transition:border-color 0.2s}
.lp-usecase-card:hover{border-color:rgba(241,93,47,0.4)}
.lp-usecase-card h4{font-size:18px;font-weight:600;color:#fff;margin:0 0 9px 0;letter-spacing:0}
.lp-usecase-card p{font-size:16px;font-weight:300;line-height:1.6;color:rgba(255,255,255,0.75);margin:0}
.lp-cta{padding:64px 42px 52px;text-align:center;display:flex;flex-direction:column;align-items:center}
.lp-cta-heading{font-size:32px;font-weight:500;color:#fff;margin:0 0 12px 0;line-height:1.25}
.lp-cta-sub{font-size:16px;font-weight:300;color:rgba(255,255,255,0.7);margin:0 0 28px 0;max-width:480px}
.lp-cta-proof{display:flex;align-items:center;justify-content:center;gap:8px;font-size:15px;font-weight:400;color:rgba(255,255,255,0.65);margin:0 0 20px 0}
.lp-cta-proof svg{flex-shrink:0}
.lp-cta-btn{width:auto;white-space:nowrap;padding:9px 32px;font-size:14px;margin-bottom:16px;align-self:center}
.lp-cta-note{font-size:12px;color:rgba(255,255,255,0.35);margin:0;font-family:'IBM Plex Mono',monospace}
.lp-hero-btn{width:auto;padding:9px 32px}
@media screen and (max-width:860px){
body.page--collab-a h1.collab-a-title{font-size:36px}
.hero-laptop-wrap{width:100%;max-width:480px;margin-left:0}
.lp-pillars{padding:36px 22.4px}
.lp-pillars-inner{grid-template-columns:1fr;gap:28px}
.lp-pillar:not(:last-child){border-right:none;border-bottom:1px solid rgba(255,255,255,0.18);margin-right:0;padding-bottom:28px;padding-right:0}
.lp-comparison,.lp-usecases,.lp-cta{padding-left:22.4px;padding-right:22.4px}
.lp-compare-grid{grid-template-columns:1fr}
.lp-compare-us{border-left:none;border-top:1px solid rgba(241,93,47,0.25)}
.lp-usecase-grid{grid-template-columns:1fr 1fr}
.lp-section-heading{font-size:26px}
.lp-cta-heading{font-size:26px}
}
@media screen and (max-width:576px){
body.page--collab-a h1.collab-a-title{font-size:30px}
.collab-a{padding-inline:var(--collab-a-margin-sm)}
.lp-comparison,.lp-usecases,.lp-cta{padding-left:11.2px;padding-right:11.2px}
.lp-pillars{padding:28px 11.2px}
.lp-usecase-grid{grid-template-columns:1fr}
.lp-section-heading{font-size:22px}
.lp-cta-heading{font-size:22px}
}
@container collab-a (width < 790px){
.collab-a-row1{margin-left:0;margin-top:30px;flex-direction:column;align-items:center;gap:0;width:100%}
.collab-a-col-left{width:100%;max-width:480px;align-items:center;align-self:center}
.collab-a-col-right{margin-top:24px;width:100%;max-width:none;align-items:flex-start}
}
</style>

<div class="collab-a-bg" aria-hidden="true">
  <img src="{{ 'home/diode-mesh.png' | prepend: site.path.images | relative_url }}" alt="" class="diode-mesh" />
</div>

<div class="collab-a-row1">
  <div class="collab-a-col-left">
    <div class="hero-laptop-wrap">
      <svg viewBox="0 0 400 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diode Vibe interface showing editor selection and deploy configuration">
        <!-- DISPLAY LID — dark bezel (hardware) -->
        <path d="M18 10 Q18 4 24 4 L376 4 Q382 4 382 10 L382 210 L18 210 Z" fill="#1e1e22" stroke="#444" stroke-width="1.2"/>
        <!-- screen — light UI background -->
        <rect x="26" y="11" width="348" height="192" rx="3" fill="#f0f0f2"/>
        <!-- browser chrome — dark tab bar -->
        <rect x="26" y="11" width="348" height="26" rx="3" fill="#2c2c30"/>
        <rect x="26" y="34" width="348" height="3" fill="#2c2c30"/>
        <!-- traffic dots -->
        <circle cx="42" cy="24" r="3.5" fill="#ff5f57"/>
        <circle cx="54" cy="24" r="3.5" fill="#febc2e"/>
        <circle cx="66" cy="24" r="3.5" fill="#28c840"/>
        <!-- URL bar -->
        <rect x="82" y="17" width="220" height="14" rx="3" fill="#3a3a40"/>
        <rect x="88" y="21.5" width="4.5" height="3.5" rx="0.5" fill="#28c840"/>
        <path d="M88.8 21.5V20.5C88.8 19.5 89.6 18.7 90.3 18.7C91 18.7 91.8 19.5 91.8 20.5V21.5" stroke="#28c840" stroke-width="0.7" fill="none" stroke-linecap="round"/>
        <text x="97" y="27.5" font-family="'SF Mono','IBM Plex Mono',monospace" font-size="6.5" fill="#b0b0b8">vibe.diode.io/settings/vibe</text>
        <!-- page content area — white -->
        <rect x="26" y="37" width="348" height="166" fill="#fafafa"/>
        <!-- sidebar hint -->
        <rect x="26" y="37" width="50" height="166" fill="#f2f2f4"/>
        <line x1="76" y1="37" x2="76" y2="203" stroke="#e0e0e4" stroke-width="0.5"/>
        <!-- sidebar items -->
        <rect x="32" y="48" width="38" height="5" rx="1" fill="#d0d0d4"/>
        <rect x="32" y="60" width="34" height="4" rx="1" fill="#c8c8cc"/>
        <rect x="32" y="70" width="36" height="4" rx="1" fill="#c8c8cc"/>
        <!-- sidebar active item (Vibe apps — orange) -->
        <rect x="30" y="80" width="42" height="6" rx="2" fill="rgba(241,93,47,0.12)"/>
        <rect x="32" y="81" width="30" height="4" rx="1" fill="#f15d2f"/>
        <rect x="32" y="92" width="32" height="4" rx="1" fill="#c8c8cc"/>
        <!-- page title -->
        <text x="86" y="56" font-family="'Poppins',sans-serif" font-size="9" font-weight="600" fill="#222">Configure your vibe coding app</text>
        <!-- select card -->
        <rect x="86" y="64" width="200" height="34" rx="4" fill="#fff" stroke="#ddd" stroke-width="0.6"/>
        <text x="94" y="75" font-family="'Poppins',sans-serif" font-size="5.5" fill="#888">Select your coding tool</text>
        <!-- dropdown -->
        <rect x="94" y="80" width="120" height="14" rx="2.5" fill="#fff" stroke="#ccc" stroke-width="0.6"/>
        <path d="M100 87L102 89.5L104 87" stroke="#f15d2f" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="108" y="90" font-family="'Poppins',sans-serif" font-size="6.5" font-weight="500" fill="#222">Cursor</text>
        <path d="M204 85L207 88L210 85" stroke="#999" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- OS detection bar -->
        <rect x="86" y="104" width="200" height="16" rx="3" fill="#f6f6f8" stroke="#e8e8ec" stroke-width="0.5"/>
        <!-- laptop icon -->
        <rect x="92" y="108" width="9" height="6" rx="1" stroke="#888" stroke-width="0.5" fill="none"/>
        <line x1="89" y1="115.5" x2="104" y2="115.5" stroke="#888" stroke-width="0.5" stroke-linecap="round"/>
        <text x="107" y="114.5" font-family="'Poppins',sans-serif" font-size="5" fill="#666">It looks like you are on a</text>
        <text x="173" y="114.5" font-family="'Poppins',sans-serif" font-size="5" font-weight="600" fill="#222">macOS</text>
        <text x="194" y="114.5" font-family="'Poppins',sans-serif" font-size="5" fill="#666">system</text>
        <!-- step section -->
        <text x="86" y="132" font-family="'Poppins',sans-serif" font-size="5.5" fill="#888">Pick your editor or agent stack, then follow the numbered steps.</text>
        <!-- steps card -->
        <rect x="86" y="138" width="272" height="58" rx="4" fill="#fff" stroke="#e0e0e4" stroke-width="0.5"/>
        <text x="94" y="150" font-family="'Poppins',sans-serif" font-size="7" font-weight="600" fill="#222">Cursor</text>
        <!-- step 1 -->
        <circle cx="100" cy="163" r="5.5" fill="#f15d2f"/>
        <text x="98" y="165.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="600" fill="#fff">1</text>
        <text x="110" y="165.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="600" fill="#333">Prepare app for deployment</text>
        <!-- step 2 -->
        <circle cx="100" cy="177" r="5.5" fill="none" stroke="#f15d2f" stroke-width="0.8"/>
        <text x="98" y="179.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="600" fill="#f15d2f">2</text>
        <text x="110" y="179.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="500" fill="#666">Install Diode CLI</text>
        <!-- step 3 -->
        <circle cx="100" cy="191" r="5.5" fill="none" stroke="#f15d2f" stroke-width="0.8"/>
        <text x="98" y="193.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="600" fill="#f15d2f">3</text>
        <text x="110" y="193.5" font-family="'Poppins',sans-serif" font-size="6" font-weight="500" fill="#666">Add this deploy tool to your vibe app</text>
        <!-- MACBOOK PRO BASE -->
        <rect x="14" y="210" width="372" height="3" rx="0.5" fill="#2a2a2e"/>
        <path d="M14 213 L6 213 Q2 213 1 215 L0 221 Q0 224 3 224 L397 224 Q400 224 400 221 L399 215 Q398 213 394 213 L386 213 Z" fill="#26262a" stroke="#52525a" stroke-width="0.8"/>
        <line x1="16" y1="213.5" x2="384" y2="213.5" stroke="#606068" stroke-width="0.3"/>
        <path d="M160 213 Q160 215.5 163 215.5 L237 215.5 Q240 215.5 240 213" fill="#222226" stroke="#52525a" stroke-width="0.5"/>
        <line x1="20" y1="221" x2="380" y2="221" stroke="#3a3a3e" stroke-width="0.3"/>
        <circle cx="30" cy="224" r="1.5" fill="#222226"/>
        <circle cx="370" cy="224" r="1.5" fill="#222226"/>
        <ellipse cx="200" cy="228" rx="180" ry="3" fill="#000" opacity="0.08"/>
      </svg>
    </div>
  </div>
  <div class="collab-a-col-right">
    <h1 class="collab-a-title">{{ page.collab_a_hero.heading }}</h1>
    <div class="collab-a-subtitle">{{ page.collab_a_hero.subheading | markdownify }}</div>
    <a href="{{ page.collab_a_hero.btn_url }}" class="collab-a-btn-download lp-hero-btn" target="_blank" rel="noopener">{{ page.collab_a_hero.btn_download }}</a>
    <div class="collab-a-line"></div>
    <div class="lp-tool-badges">
      <span class="lp-tool-badge">Cursor</span>
      <span class="lp-tool-badge">Zed</span>
      <span class="lp-tool-badge">Claude Desktop</span>
      <span class="lp-tool-badge">ChatGPT / Codex</span>
      <span class="lp-tool-badge">VS Code</span>
      <span class="lp-tool-badge">Windsurf</span>
    </div>
  </div>
</div>

<div class="lp-sections">

  <div class="lp-pillars">
    <div class="lp-pillars-inner">
      <div class="lp-pillar">
        <div class="lp-pillar-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 3L4 8V16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16V8L16 3Z" stroke="#f15d2f" stroke-width="1.5" stroke-linejoin="round"/><path d="M11 16L14 19L21 13" stroke="#f15d2f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3 class="lp-pillar-title">Secure Deployment</h3>
        <p class="lp-pillar-text">Launch apps through a secure deployment process so projects are protected from the start.</p>
      </div>
      <div class="lp-pillar">
        <div class="lp-pillar-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="14" width="14" height="12" rx="2" stroke="#f15d2f" stroke-width="1.5"/><path d="M11 14V11C11 8.791 13.239 7 16 7C18.761 7 21 8.791 21 11V14" stroke="#f15d2f" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="20" r="1.5" fill="#f15d2f"/></svg>
        </div>
        <h3 class="lp-pillar-title">Private by Default</h3>
        <p class="lp-pillar-text">Run applications off the public internet and keep them accessible only to the people you authorize.</p>
      </div>
      <div class="lp-pillar">
        <div class="lp-pillar-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="24" height="16" rx="2" stroke="#f15d2f" stroke-width="1.5"/><path d="M4 22L6 26H26L28 22" stroke="#f15d2f" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 14L16 11L19 14M16 11V19" stroke="#f15d2f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3 class="lp-pillar-title">Fast Deployment</h3>
        <p class="lp-pillar-text">Go from idea to operational app as quickly as you can vibe, without managing network infrastructure.</p>
      </div>
    </div>
  </div>

  <div class="lp-comparison">
    <div class="lp-inner">
      <h2 class="lp-section-heading">Move vibe-coded apps off public infrastructure.</h2>
      <p class="lp-section-sub">Deploy dashboards, prototypes, and sensitive tools into Diode's private Zones with no central servers, no exposed databases, and full control over access.</p>
      <div class="lp-compare-grid">
        <div class="lp-compare-col lp-compare-them">
          <div class="lp-compare-label">Public Infrastructure</div>
          <ul class="lp-compare-list">
            <li class="lp-compare-bad">Apps hosted on central servers controlled by a third party</li>
            <li class="lp-compare-bad">Membership and access managed by the platform, not by you</li>
            <li class="lp-compare-bad">Sharing requires exposing your app to the open internet</li>
          </ul>
        </div>
        <div class="lp-compare-col lp-compare-us">
          <div class="lp-compare-label lp-compare-label-us">Diode Vibe</div>
          <ul class="lp-compare-list">
            <li class="lp-compare-good">No central servers: apps publish through the Diode network, not third-party infrastructure</li>
            <li class="lp-compare-good">Controlled membership: private Zones with end-to-end encryption and no PII required</li>
            <li class="lp-compare-good">Public or private: choose who can access your app, enforced at the network layer</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="lp-usecases">
    <div class="lp-inner">
      <h2 class="lp-section-heading">Everything you need to deploy vibe-coded apps.</h2>
      <div class="lp-usecase-grid">
        <div class="lp-usecase-card">
          <h4>Public or Private Publishing</h4>
          <p>Choose whether your app is shared publicly or kept private within a controlled Zone.</p>
        </div>
        <div class="lp-usecase-card">
          <h4>Tool Compatibility</h4>
          <p>Link and use your preferred coding tools and workflows. Diode Vibe integrates with the editors you already use.</p>
        </div>
        <div class="lp-usecase-card">
          <h4>Guided Setup</h4>
          <p>Step-by-step instructions make it easy for anyone to securely launch a vibe-coded application.</p>
        </div>
        <div class="lp-usecase-card">
          <h4>Zone-Based Publishing</h4>
          <p>Leverage the Diode Network to publish apps privately to Zones for controlled team access and collaboration.</p>
        </div>
        <div class="lp-usecase-card">
          <h4>Vibe Coding &amp; Support</h4>
          <p>Build and deploy vibe-coded apps quickly, without needing deep technical or infrastructure expertise.</p>
        </div>
        <div class="lp-usecase-card">
          <h4>Accessible &amp; Secure</h4>
          <p>Lower the barrier to building apps while maintaining strong privacy and security protections.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="lp-cta">
    <h2 class="lp-cta-heading">Deploy your first vibe-coded app in minutes.</h2>
    <p class="lp-cta-sub">Pick your editor, follow the guided steps, publish to your Zone. No infrastructure setup. No domain registration. No DevOps required.</p>
    <p class="lp-cta-proof">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="7" stroke="#f15d2f" stroke-width="1"/><path d="M5 8L7 10L11 6" stroke="#f15d2f" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Works with Cursor, Zed, Claude Desktop, VS Code, Windsurf, and more
    </p>
    <a href="https://vibe.diode.io" class="collab-a-btn-download lp-cta-btn" target="_blank" rel="noopener">GET STARTED</a>
    <p class="lp-cta-note">No central servers. No exposed databases. Full control over access.</p>
  </div>

</div>
