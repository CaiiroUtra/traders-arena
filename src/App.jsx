const API_URL = "https://traders-arena-production.up.railway.app";
import { useState, useRef, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --bg:#060810;--s1:#0b0e18;--s2:#10141f;--s3:#161c2a;--s4:#1c2333;
  --bd:#222d42;--bd2:#2d3d5a;
  --g:#00f5c4;--gold:#ffb830;--red:#ff3d6b;--blue:#38bdf8;--purple:#c084fc;
  --txt:#eef2ff;--muted:#4a6080;--muted2:#6a85a8;
  --font:'Outfit',sans-serif;--mono:'Fira Code',monospace;
}
body{background:var(--bg);color:var(--txt);font-family:var(--font);min-height:100vh;overflow-x:hidden;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--s1);}::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:3px;}
button{font-family:var(--font);}
/* LAYOUT */
.shell{display:flex;min-height:100vh;}
.sb{width:220px;flex-shrink:0;background:var(--s1);border-right:1px solid var(--bd);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:100;transition:transform .25s;}
.main{margin-left:220px;flex:1;min-height:100vh;}
@media(max-width:768px){.sb{transform:translateX(-100%);}.sb.open{transform:translateX(0);}.main{margin-left:0;}}
/* SIDEBAR */
.sb-logo{padding:18px 16px 12px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:10px;}
.sb-mark{width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--g),var(--blue));display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.sb-name{font-weight:800;font-size:17px;}.sb-name span{color:var(--g);}
.sb-nav{padding:10px 8px;flex:1;overflow-y:auto;}
.sb-sec{font-size:9px;font-weight:700;letter-spacing:2px;color:var(--muted);text-transform:uppercase;padding:10px 8px 5px;}
.sb-i{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;transition:all .15s;color:var(--muted2);font-size:13px;font-weight:500;margin-bottom:1px;border:1px solid transparent;}
.sb-i:hover{background:var(--s2);color:var(--txt);}
.sb-i.on{background:rgba(0,245,196,.08);color:var(--g);border-color:rgba(0,245,196,.15);}
.sb-ic{font-size:15px;width:20px;text-align:center;flex-shrink:0;}
.sb-bd{margin-left:auto;background:var(--red);color:#fff;font-size:9px;font-weight:700;padding:2px 6px;border-radius:100px;}
.sb-bdg{background:rgba(0,245,196,.15);color:var(--g);}
.sb-bot{padding:12px;border-top:1px solid var(--bd);}
.u-pill{display:flex;align-items:center;gap:8px;padding:10px;background:var(--s2);border-radius:10px;border:1px solid var(--bd);}
.u-av{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--g),var(--blue));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#000;flex-shrink:0;}
/* TOPBAR */
.topbar{height:56px;border-bottom:1px solid var(--bd);background:rgba(6,8,16,.9);backdrop-filter:blur(12px);display:flex;align-items:center;padding:0 24px;gap:12px;position:sticky;top:0;z-index:50;}
.tb-title{font-weight:700;font-size:17px;flex:1;}
/* BUTTONS */
.btn{padding:7px 16px;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;border:none;transition:all .15s;}
.btn-g{background:var(--g);color:#000;}.btn-g:hover{opacity:.85;}
.btn-outline{background:transparent;color:var(--g);border:1px solid var(--g);}.btn-outline:hover{background:rgba(0,245,196,.07);}
.btn-ghost{background:transparent;color:var(--muted2);border:1px solid var(--bd);}.btn-ghost:hover{color:var(--txt);}
.btn-gold{background:var(--gold);color:#000;}
.btn-lg{padding:12px 28px;font-size:14px;border-radius:9px;}
/* PAGE */
.page{padding:24px;max-width:1200px;}
.ph{margin-bottom:22px;}.ph-t{font-size:22px;font-weight:800;margin-bottom:4px;}.ph-s{font-size:13px;color:var(--muted2);}
/* CARDS */
.kpi-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:20px;}
.kpi{background:var(--s2);border:1px solid var(--bd);border-radius:10px;padding:16px 18px;}
.kpi-l{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
.kpi-v{font-family:var(--mono);font-size:26px;font-weight:600;}
.kpi-s{font-size:11px;margin-top:3px;}
.up{color:#00e676;}.dn{color:var(--red);}
.card{background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:20px;}
.card-h{font-size:14px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.tag{display:inline-flex;align-items:center;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;font-family:var(--mono);}
.tg{background:rgba(0,230,118,.1);color:#00e676;}.tr{background:rgba(255,61,107,.1);color:var(--red);}
.tgold{background:rgba(255,184,48,.1);color:var(--gold);}.tblue{background:rgba(56,189,248,.1);color:var(--blue);}
/* SIGNALS */
.sig-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}
.sig-card{background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:18px;position:relative;overflow:hidden;}
.sig-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;}
.sig-card.buy::before{background:linear-gradient(90deg,var(--g),transparent);}
.sig-card.sell::before{background:linear-gradient(90deg,var(--red),transparent);}
.sig-card.wait::before{background:linear-gradient(90deg,var(--gold),transparent);}
.sig-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;}
.sig-sym{font-family:var(--mono);font-size:18px;font-weight:700;}
.sig-full{font-size:10px;color:var(--muted);margin-top:2px;}
.sb-buy{background:rgba(0,245,196,.1);color:var(--g);border:1px solid rgba(0,245,196,.2);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;font-family:var(--mono);}
.sb-sell{background:rgba(255,61,107,.1);color:var(--red);border:1px solid rgba(255,61,107,.2);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;font-family:var(--mono);}
.sb-wait{background:rgba(255,184,48,.1);color:var(--gold);border:1px solid rgba(255,184,48,.2);padding:4px 10px;border-radius:5px;font-size:11px;font-weight:700;font-family:var(--mono);}
.sig-rows{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;}
.sig-row{display:flex;justify-content:space-between;font-size:12px;}
.sig-lbl{color:var(--muted);}
.sig-val{font-family:var(--mono);font-weight:600;}
.conf-bar{}.conf-label{display:flex;justify-content:space-between;font-size:11px;margin-bottom:5px;}
.conf-track{height:4px;background:var(--s3);border-radius:2px;}
.conf-fill{height:4px;border-radius:2px;transition:width .3s;}
/* TABS */
.tabs-bar{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;}
.tb{padding:6px 14px;border-radius:6px;border:1px solid var(--bd);background:var(--s2);font-size:12px;font-weight:600;cursor:pointer;color:var(--muted2);}
.tb.on{border-color:var(--g);color:var(--g);background:rgba(0,245,196,.06);}
/* PROP FIRMS */
.prop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
.prop-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;padding:20px;transition:border-color .15s;}
.prop-card:hover{border-color:var(--bd2);}
.prop-header{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;}
.prop-logo{width:52px;height:52px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;}
.prop-name{font-size:17px;font-weight:800;}
.prop-rating{font-size:11px;color:var(--muted);margin-top:2px;}
.prop-feats{list-style:none;display:flex;flex-direction:column;gap:5px;margin-bottom:16px;}
.prop-feats li{font-size:12px;color:var(--muted2);display:flex;gap:7px;}
.prop-feats li::before{content:'✓';color:var(--g);font-weight:700;flex-shrink:0;}
.code-row{background:var(--s3);border:1px solid var(--bd);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.code-val{font-family:var(--mono);font-size:13px;font-weight:700;color:var(--gold);}
.prop-comm{font-size:11px;color:var(--g);text-align:center;}
/* STRATEGIES */
.strat-layout{display:grid;grid-template-columns:250px 1fr;gap:0;min-height:580px;}
@media(max-width:860px){.strat-layout{grid-template-columns:1fr;}}
.strat-list{border-right:1px solid var(--bd);padding:10px;overflow-y:auto;max-height:700px;}
.strat-item{padding:11px 12px;border-radius:9px;cursor:pointer;transition:all .15s;margin-bottom:3px;border:1px solid transparent;}
.strat-item:hover{background:var(--s3);}
.strat-item.on{background:var(--s3);border-color:var(--bd2);}
.strat-icon{font-size:20px;margin-bottom:5px;}
.strat-title{font-size:12px;font-weight:700;margin-bottom:3px;line-height:1.3;}
.strat-detail{padding:22px;overflow-y:auto;max-height:700px;}
.strat-hero{padding:18px;border-radius:10px;border:1px solid var(--bd);margin-bottom:20px;display:flex;gap:14px;align-items:flex-start;}
.sh-icon{font-size:36px;flex-shrink:0;}
.sh-title{font-size:19px;font-weight:800;margin-bottom:5px;}
.sh-sub{font-size:12px;color:var(--muted2);line-height:1.6;margin-bottom:8px;}
.sh-tags{display:flex;gap:8px;flex-wrap:wrap;}
.ss-h{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.ss-h::after{content:'';flex:1;height:1px;background:var(--bd);}
.ss{margin-bottom:18px;}
.concept-list{display:flex;flex-direction:column;gap:5px;}
.concept-i{font-size:12px;color:var(--muted2);padding:7px 11px;background:var(--s3);border-radius:6px;border-left:2px solid var(--bd2);}
.steps-list{display:flex;flex-direction:column;gap:8px;}
.step-c{display:flex;gap:12px;padding:12px 14px;background:var(--s3);border-radius:9px;border:1px solid var(--bd);}
.step-n{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0;margin-top:1px;}
.step-t{font-size:13px;font-weight:700;margin-bottom:3px;}
.step-d{font-size:12px;color:var(--muted2);line-height:1.5;}
.tips-list{display:flex;flex-direction:column;gap:7px;}
.tip-i{display:flex;gap:9px;font-size:12px;color:var(--muted2);padding:8px 11px;background:rgba(255,184,48,.04);border:1px solid rgba(255,184,48,.1);border-radius:6px;}
.mentor-list{display:flex;gap:8px;flex-wrap:wrap;}
.m-sug{display:flex;align-items:center;gap:8px;padding:9px 12px;background:var(--s3);border:1px solid var(--bd);border-radius:8px;cursor:pointer;}
.m-sug:hover{border-color:var(--g);}
.m-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0;}
.mkt-chips{display:flex;gap:6px;flex-wrap:wrap;}
.mkt-chip{padding:3px 9px;border-radius:5px;font-family:var(--mono);font-size:10px;font-weight:600;background:var(--s3);border:1px solid var(--bd);color:var(--muted2);}
/* CHAT */
.chat-layout{display:grid;grid-template-columns:200px 1fr;gap:0;height:600px;overflow:hidden;border-radius:12px;border:1px solid var(--bd);}
.ch-sidebar{border-right:1px solid var(--bd);background:var(--s1);overflow-y:auto;}
.ch-sec{font-size:9px;font-weight:700;letter-spacing:1.5px;color:var(--muted);text-transform:uppercase;padding:12px 12px 5px;}
.ch-item{display:flex;align-items:center;gap:7px;padding:7px 12px;cursor:pointer;font-size:12px;color:var(--muted2);}
.ch-item.on{background:rgba(0,245,196,.06);color:var(--g);}
.ch-item:hover{background:var(--s2);}
.ch-dot{width:7px;height:7px;border-radius:50%;background:var(--g);flex-shrink:0;animation:pulse 1.8s infinite;}
.ch-unread{margin-left:auto;background:var(--red);color:#fff;font-size:9px;font-weight:700;padding:1px 5px;border-radius:10px;}
.ch-main{display:flex;flex-direction:column;background:var(--s2);}
.ch-head{padding:12px 16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:8px;font-weight:700;}
.ch-msgs{flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;}
.msg{display:flex;gap:10px;}
.msg-av{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.msg-body{flex:1;}
.msg-meta{display:flex;align-items:center;gap:6px;margin-bottom:3px;}
.msg-name{font-size:12px;font-weight:700;}
.msg-time{font-size:10px;color:var(--muted);}
.msg-role{font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;}
.msg-txt{font-size:13px;color:var(--muted2);line-height:1.5;}
.msg-sig{background:var(--s3);border:1px solid var(--bd);border-radius:8px;padding:10px 12px;margin-top:6px;display:flex;gap:16px;flex-wrap:wrap;font-family:var(--mono);font-size:11px;}
.ch-input-row{padding:12px 16px;border-top:1px solid var(--bd);display:flex;gap:8px;}
.ch-input{flex:1;padding:9px 13px;background:var(--s3);border:1px solid var(--bd);border-radius:7px;color:var(--txt);font-family:var(--font);font-size:13px;outline:none;}
.ch-input:focus{border-color:var(--g);}
/* COURSES */
.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;}
.course-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;overflow:hidden;transition:all .2s;}
.course-card:hover{transform:translateY(-3px);border-color:var(--bd2);}
.course-banner{height:90px;display:flex;align-items:center;justify-content:center;font-size:40px;}
.course-body{padding:16px;}
.course-mentor{font-size:10px;color:var(--muted);margin-bottom:5px;}
.course-title{font-size:14px;font-weight:700;margin-bottom:8px;line-height:1.35;}
.course-meta{display:flex;gap:10px;font-size:11px;color:var(--muted2);margin-bottom:12px;}
.course-price{font-family:var(--mono);font-size:17px;font-weight:700;color:var(--gold);margin-bottom:10px;}
/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px;}
.modal{background:var(--s1);border:1px solid var(--bd);border-radius:16px;width:100%;max-width:460px;max-height:90vh;overflow-y:auto;}
.modal-head{padding:20px 22px 0;display:flex;justify-content:space-between;align-items:flex-start;}
.modal-title{font-size:18px;font-weight:800;}.modal-sub{font-size:12px;color:var(--muted);}
.close-x{background:var(--s2);border:1px solid var(--bd);color:var(--txt);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;}
.modal-body{padding:20px 22px;}
.pay-tabs{display:flex;gap:6px;margin-bottom:18px;}
.pay-tab{flex:1;padding:10px;border-radius:8px;border:1px solid var(--bd);background:var(--s2);cursor:pointer;text-align:center;font-size:12px;font-weight:600;color:var(--muted2);}
.pay-tab.on{border-color:var(--g);color:var(--g);background:rgba(0,245,196,.06);}
.f-label{font-size:10px;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;}
.f-input{width:100%;padding:11px 13px;background:var(--s2);border:1px solid var(--bd);border-radius:7px;color:var(--txt);font-family:var(--mono);font-size:13px;outline:none;margin-bottom:14px;}
.f-input:focus{border-color:var(--g);}
.net-opts{display:flex;gap:8px;margin-bottom:14px;}
.net-opt{padding:6px 14px;border-radius:6px;border:1px solid var(--bd);background:var(--s2);font-family:var(--mono);font-size:11px;cursor:pointer;color:var(--muted);}
.net-opt.on{border-color:var(--gold);color:var(--gold);}
.wallet-box{background:var(--s3);border:1px solid var(--bd);border-radius:8px;padding:12px 14px;margin-bottom:14px;}
.info-box{background:rgba(0,245,196,.04);border:1px solid rgba(0,245,196,.15);border-radius:7px;padding:10px 12px;margin-bottom:14px;font-size:12px;color:var(--g);line-height:1.6;}
.warn-box{background:rgba(255,184,48,.04);border:1px solid rgba(255,184,48,.2);border-radius:7px;padding:9px 12px;margin-bottom:14px;font-size:11px;color:var(--gold);line-height:1.6;}
.pay-btn{width:100%;padding:13px;border-radius:9px;border:none;font-size:14px;font-weight:700;cursor:pointer;}
.pay-mpesa{background:linear-gradient(135deg,#e8002d,#b00020);color:#fff;}
.pay-emola{background:linear-gradient(135deg,#0055cc,#003da0);color:#fff;}
.pay-usdt{background:linear-gradient(135deg,#26a17b,#1a7058);color:#fff;}
/* LANDING */
.landing{background:var(--bg);}
.hero{min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 20px;position:relative;overflow:hidden;}
.hero-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 50% 30%,rgba(0,245,196,.07),transparent);}
.hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(0,245,196,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,196,.03) 1px,transparent 1px);background-size:48px 48px;}
.badge-live{display:inline-flex;align-items:center;gap:8px;padding:6px 18px;border-radius:100px;border:1px solid rgba(0,245,196,.2);background:rgba(0,245,196,.04);font-size:11px;font-weight:600;color:var(--g);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px;}
.pulse{width:7px;height:7px;border-radius:50%;background:var(--g);animation:pulse 1.8s infinite;}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.5}}
.hero h1{font-size:clamp(44px,8vw,88px);font-weight:900;line-height:1;margin-bottom:14px;letter-spacing:-1px;}
.hero h1 em{font-style:normal;color:var(--g);}
.hero-desc{font-size:clamp(14px,2vw,18px);color:var(--muted2);max-width:560px;line-height:1.7;margin:0 auto 40px;}
.hero-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:60px;position:relative;z-index:10;}
.hero-stats{display:flex;gap:48px;justify-content:center;flex-wrap:wrap;}
.hs-n{font-size:32px;font-weight:900;color:var(--g);font-family:var(--mono);}
.hs-l{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-top:3px;}
/* TICKER */
.ticker{overflow:hidden;border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);background:var(--s1);padding:9px 0;}
.ticker-track{display:flex;width:max-content;animation:scroll 32s linear infinite;gap:0;}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick{display:flex;align-items:center;gap:8px;padding:0 22px;border-right:1px solid var(--bd);font-size:11px;}
.tick-sym{font-family:var(--mono);font-weight:700;}
.tick-val{color:var(--muted2);font-family:var(--mono);}
/* LANDING SECTIONS */
.sec{padding:72px 24px;}.sec.alt{background:var(--s1);}
.sec-wrap{max-width:700px;margin:0 auto 48px;text-align:center;}
.sec-tag{display:inline-block;padding:4px 14px;border-radius:100px;background:rgba(0,245,196,.08);border:1px solid rgba(0,245,196,.2);font-size:11px;font-weight:600;color:var(--g);margin-bottom:12px;}
.sec-h{font-size:clamp(26px,4vw,40px);font-weight:900;margin-bottom:12px;}
.sec-p{font-size:15px;color:var(--muted2);line-height:1.7;}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;max-width:1100px;margin:0 auto;}
.feat-card{background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:24px 20px;transition:all .2s;position:relative;}
.feat-card:hover{transform:translateY(-3px);border-color:var(--bd2);}
.feat-icon{font-size:28px;margin-bottom:12px;}
.feat-title{font-size:14px;font-weight:700;margin-bottom:6px;}
.feat-desc{font-size:12px;color:var(--muted2);line-height:1.6;}
.feat-new{position:absolute;top:12px;right:12px;background:var(--g);color:#000;font-size:9px;font-weight:800;padding:2px 7px;border-radius:3px;}
/* PLANS */
.plans-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;max-width:900px;margin:0 auto;}
.plan-card{background:var(--s2);border:1px solid var(--bd);border-radius:16px;padding:28px 22px;position:relative;transition:all .2s;}
.plan-card.hot{border-color:var(--g);background:rgba(0,245,196,.03);}
.plan-card:hover{transform:translateY(-4px);}
.plan-hot{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--g);color:#000;font-size:10px;font-weight:800;padding:4px 16px;border-radius:100px;white-space:nowrap;}
.plan-ico{font-size:32px;margin-bottom:12px;}
.plan-name{font-size:20px;font-weight:800;margin-bottom:4px;}
.plan-price{font-family:var(--mono);font-size:32px;font-weight:700;color:var(--g);margin-bottom:4px;}
.plan-usd{font-size:12px;color:var(--muted);margin-bottom:20px;}
.plan-feats{list-style:none;display:flex;flex-direction:column;gap:8px;margin-bottom:22px;}
.plan-feats li{font-size:13px;color:var(--muted2);display:flex;gap:8px;}
.plan-feats li::before{content:'✓';color:var(--g);font-weight:700;flex-shrink:0;}
/* BACKTEST */
.bt-controls{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;}
.bt-sel{padding:9px 14px;background:var(--s2);border:1px solid var(--bd);border-radius:7px;color:var(--txt);font-family:var(--font);font-size:13px;outline:none;cursor:pointer;}
.bt-sel:focus{border-color:var(--g);}
.bt-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:18px;}
.bt-stat{background:var(--s3);border:1px solid var(--bd);border-radius:8px;padding:12px 14px;}
.bt-sl{font-size:10px;color:var(--muted);margin-bottom:4px;}
.bt-sv{font-family:var(--mono);font-size:18px;font-weight:700;}
.chart-area{background:var(--s3);border:1px solid var(--bd);border-radius:8px;padding:14px;height:200px;position:relative;overflow:hidden;}
.chart-line{position:absolute;bottom:20px;left:14px;right:14px;height:160px;}
/* FOOTER */
.footer{padding:28px 24px;border-top:1px solid var(--bd);background:var(--s1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;}
.pay-bdgs{display:flex;gap:8px;flex-wrap:wrap;}
.pay-bdg{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:100px;border:1px solid var(--bd);background:var(--s2);font-size:11px;color:var(--muted2);}
/* MENU BTN */
.menu-btn{display:none;background:transparent;border:1px solid var(--bd);color:var(--txt);padding:7px 10px;border-radius:7px;cursor:pointer;font-size:16px;}
@media(max-width:768px){.menu-btn{display:flex;align-items:center;}}
/* SUCCESS */
.succ-screen{text-align:center;padding:16px 0;}
.succ-ico{font-size:52px;animation:pop .35s ease;margin-bottom:12px;}
@keyframes pop{from{transform:scale(.4)}to{transform:scale(1)}}

/* ── NEW: PROFILE ── */
.profile-cover{height:140px;background:linear-gradient(135deg,rgba(0,245,196,.15),rgba(56,189,248,.1));border-radius:14px 14px 0 0;position:relative;border:1px solid var(--bd);border-bottom:none;}
.profile-av-wrap{position:absolute;bottom:-28px;left:24px;}
.profile-av{width:72px;height:72px;border-radius:50%;border:3px solid var(--bg);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:28px;background:linear-gradient(135deg,var(--g),var(--blue));color:#000;}
.profile-body{background:var(--s2);border:1px solid var(--bd);border-top:none;border-radius:0 0 14px 14px;padding:40px 24px 24px;}
.profile-name{font-size:22px;font-weight:900;margin-bottom:2px;}
.profile-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
.p-badge{padding:3px 10px;border-radius:100px;font-size:10px;font-weight:700;}
.profile-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;margin-bottom:18px;}
.ps-item{background:var(--s3);border:1px solid var(--bd);border-radius:9px;padding:12px 14px;text-align:center;}
.ps-val{font-family:var(--mono);font-size:18px;font-weight:700;margin-bottom:2px;}
.ps-lbl{font-size:10px;color:var(--muted);text-transform:uppercase;}
.level-bar-wrap{background:var(--s3);border:1px solid var(--bd);border-radius:10px;padding:14px 16px;margin-bottom:16px;}
.level-bar{height:8px;background:var(--s4);border-radius:4px;overflow:hidden;margin-top:8px;}
.level-fill{height:8px;border-radius:4px;background:linear-gradient(90deg,var(--g),var(--blue));transition:width .5s;}

/* ── NEW: LEADERBOARD ── */
.lb-table{width:100%;border-collapse:collapse;}
.lb-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;padding:8px 12px;border-bottom:1px solid var(--bd);text-align:left;}
.lb-table td{padding:10px 12px;border-bottom:1px solid rgba(34,45,66,.5);font-size:13px;}
.lb-table tr:hover td{background:var(--s3);}
.lb-rank{font-family:var(--mono);font-weight:800;font-size:14px;}
.lb-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;}
.lb-country{font-size:16px;}
.trophy-1{color:#ffd700;}.trophy-2{color:#c0c0c0;}.trophy-3{color:#cd7f32;}
.king-card{background:linear-gradient(135deg,rgba(255,184,48,.08),rgba(255,184,48,.03));border:1px solid rgba(255,184,48,.3);border-radius:14px;padding:22px;margin-bottom:20px;display:flex;align-items:center;gap:18px;}
.king-crown{font-size:48px;animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

/* ── NEW: FEED SOCIAL ── */
.feed-grid{display:flex;flex-direction:column;gap:14px;max-width:680px;}
.post-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;padding:18px;}
.post-header{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;}
.post-av{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;flex-shrink:0;}
.post-body{flex:1;}
.post-name{font-weight:700;font-size:14px;}
.post-meta{font-size:11px;color:var(--muted);}
.post-content{font-size:14px;color:var(--muted2);line-height:1.6;margin-bottom:12px;}
.post-trade-box{background:var(--s3);border:1px solid var(--bd);border-radius:9px;padding:12px 14px;margin-bottom:12px;display:flex;gap:16px;flex-wrap:wrap;font-family:var(--mono);font-size:12px;}
.post-actions{display:flex;gap:16px;}
.post-action{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted2);cursor:pointer;padding:5px 8px;border-radius:6px;transition:all .15s;}
.post-action:hover{background:var(--s3);color:var(--txt);}
.post-action.liked{color:var(--red);}
.post-input{background:var(--s2);border:1px solid var(--bd);border-radius:12px;padding:16px;margin-bottom:16px;display:flex;gap:12px;align-items:flex-start;}

/* ── NEW: COMPETITIONS ── */
.comp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;}
.comp-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;overflow:hidden;transition:all .2s;}
.comp-card:hover{transform:translateY(-3px);border-color:var(--bd2);}
.comp-banner{height:80px;display:flex;align-items:center;justify-content:center;gap:12px;font-size:28px;font-weight:900;position:relative;overflow:hidden;}
.comp-body{padding:16px;}
.comp-title{font-size:15px;font-weight:800;margin-bottom:5px;}
.comp-pool{font-family:var(--mono);font-size:22px;font-weight:800;color:var(--gold);margin-bottom:8px;}
.comp-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
.prize-row{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
.prize-i{display:flex;align-items:center;gap:10px;font-size:12px;}
.prize-pos{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;}
.league-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px;}
.league-card{border-radius:12px;padding:18px 14px;text-align:center;cursor:pointer;transition:all .2s;border:1px solid transparent;}
.league-card:hover{transform:translateY(-3px);}
.league-card.active{border-color:rgba(0,245,196,.4);}
.league-icon{font-size:32px;margin-bottom:8px;}
.league-name{font-size:13px;font-weight:800;margin-bottom:3px;}
.league-pts{font-size:10px;color:var(--muted);}
.battle-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;padding:20px;margin-bottom:14px;}
.battle-vs{display:flex;align-items:center;gap:16px;}
.battle-trader{flex:1;text-align:center;}
.battle-vs-badge{font-size:18px;font-weight:900;color:var(--gold);background:rgba(255,184,48,.1);border:1px solid rgba(255,184,48,.3);padding:8px 14px;border-radius:8px;}
.battle-bar{height:12px;background:var(--s3);border-radius:6px;overflow:hidden;margin:14px 0;display:flex;}
.battle-fill-a{height:12px;background:var(--g);border-radius:6px 0 0 6px;transition:width .5s;}
.battle-fill-b{height:12px;background:var(--red);border-radius:0 6px 6px 0;transition:width .5s;}

/* ── NEW: MARKETPLACE ── */
.mkt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;}
.mkt-card{background:var(--s2);border:1px solid var(--bd);border-radius:14px;overflow:hidden;transition:all .2s;cursor:pointer;}
.mkt-card:hover{transform:translateY(-3px);border-color:var(--bd2);}
.mkt-banner{height:72px;display:flex;align-items:center;justify-content:center;font-size:36px;}
.mkt-body{padding:14px;}
.mkt-type{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;}
.mkt-title{font-size:14px;font-weight:700;margin-bottom:5px;}
.mkt-price{font-family:var(--mono);font-size:18px;font-weight:800;color:var(--gold);}

/* ── NEW: MT5 CONNECT ── */
.mt5-flow{display:flex;align-items:center;gap:0;flex-wrap:wrap;margin-bottom:24px;}
.mt5-step{background:var(--s3);border:1px solid var(--bd);border-radius:10px;padding:14px 16px;text-align:center;flex:1;min-width:110px;}
.mt5-arrow{color:var(--muted);font-size:18px;padding:0 8px;flex-shrink:0;}
.mt5-status{display:flex;align-items:center;gap:10px;padding:14px 16px;background:var(--s3);border:1px solid var(--bd);border-radius:10px;margin-bottom:14px;}

/* ── ECONOMIC CALENDAR ── */
.cal-wrap{overflow-x:auto;}
.cal-table{width:100%;border-collapse:collapse;min-width:700px;}
.cal-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;padding:10px 14px;border-bottom:1px solid var(--bd);text-align:left;white-space:nowrap;background:var(--s1);}
.cal-table td{padding:11px 14px;border-bottom:1px solid rgba(34,45,66,.4);font-size:13px;vertical-align:middle;}
.cal-table tr:hover td{background:rgba(255,255,255,.018);}
.cal-row-high{border-left:3px solid var(--red);}
.cal-row-medium{border-left:3px solid var(--gold);}
.cal-row-low{border-left:3px solid #00e676;}
.imp{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:100px;font-size:10px;font-weight:700;white-space:nowrap;}
.imp-high{background:rgba(255,61,107,.12);color:var(--red);border:1px solid rgba(255,61,107,.28);}
.imp-med{background:rgba(255,184,48,.12);color:var(--gold);border:1px solid rgba(255,184,48,.28);}
.imp-low{background:rgba(0,230,118,.12);color:#00e676;border:1px solid rgba(0,230,118,.28);}
.cur-chip{display:inline-flex;align-items:center;gap:4px;font-family:var(--mono);font-size:11px;font-weight:800;padding:3px 8px;border-radius:5px;}
.cal-time{font-family:var(--mono);font-size:13px;font-weight:600;white-space:nowrap;}
.cal-val{font-family:var(--mono);font-size:12px;text-align:right;padding-right:6px;}
.cal-name{font-weight:600;font-size:13px;line-height:1.3;}
.cal-sub{font-size:10px;color:var(--muted);margin-top:2px;}
.cal-now td{background:rgba(0,245,196,.03);border-top:1px dashed rgba(0,245,196,.3);}
.alert-strip{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:9px;margin-bottom:8px;}
.alert-strip-high{background:rgba(255,61,107,.07);border:1px solid rgba(255,61,107,.28);animation:alertpulse 2s infinite;}
.alert-strip-med{background:rgba(255,184,48,.06);border:1px solid rgba(255,184,48,.22);}
@keyframes alertpulse{0%,100%{opacity:1}50%{opacity:.7}}
.cur-btn{padding:6px 13px;border-radius:6px;border:1px solid var(--bd);background:var(--s2);font-family:var(--mono);font-size:11px;font-weight:700;cursor:pointer;color:var(--muted2);transition:all .15s;}
.cur-btn.on{border-color:var(--g);color:var(--g);background:rgba(0,245,196,.07);}
.day-btn{padding:6px 14px;border-radius:6px;border:1px solid var(--bd);background:var(--s2);font-size:12px;font-weight:600;cursor:pointer;color:var(--muted2);transition:all .15s;}
.day-btn.on{border-color:var(--blue);color:var(--blue);background:rgba(56,189,248,.07);}
.live-dot{width:7px;height:7px;border-radius:50%;background:var(--g);animation:pulse 1.8s infinite;display:inline-block;}
.cal-spinner{display:flex;align-items:center;justify-content:center;padding:48px;flex-direction:column;gap:12px;color:var(--muted2);font-size:13px;}
.spinner{width:28px;height:28px;border:3px solid var(--bd);border-top-color:var(--g);border-radius:50%;animation:spin .7s linear infinite;}
/* ── PRIZE ENGINE ── */
.prize-engine{background:var(--s1);border:1px solid var(--bd);border-radius:14px;overflow:hidden;margin-bottom:20px;}
.pe-header{padding:16px 20px;border-bottom:1px solid var(--bd);background:var(--s2);display:flex;align-items:center;gap:10px;}
.pe-body{padding:20px;}
.pe-slider-row{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
.pe-slider{flex:1;accent-color:var(--g);cursor:pointer;height:4px;}
.pe-val{font-family:var(--mono);font-size:14px;font-weight:700;min-width:60px;text-align:right;}
.pe-formula{background:var(--s3);border:1px solid var(--bd);border-radius:9px;padding:14px 16px;margin-bottom:16px;font-family:var(--mono);font-size:12px;line-height:1.8;color:var(--muted2);}
.pe-formula strong{color:var(--g);}
.pe-result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:14px;}
.pe-result-card{border-radius:10px;padding:14px 16px;text-align:center;}
.pe-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;}
.pe-amount{font-family:var(--mono);font-size:22px;font-weight:800;}
.pe-note{font-size:10px;margin-top:3px;opacity:.7;}
.pe-prizes-table{width:100%;border-collapse:collapse;margin-bottom:10px;}
.pe-prizes-table th{font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:1px;padding:7px 10px;border-bottom:1px solid var(--bd);text-align:left;}
.pe-prizes-table td{padding:9px 10px;border-bottom:1px solid rgba(34,45,66,.3);font-size:13px;}
.min-block{background:rgba(255,61,107,.06);border:1px solid rgba(255,61,107,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--red);display:flex;align-items:center;gap:8px;}
.ok-block{background:rgba(0,230,118,.06);border:1px solid rgba(0,230,118,.2);border-radius:8px;padding:10px 14px;font-size:12px;color:#00e676;display:flex;align-items:center;gap:8px;}
.promo-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
.promo-btn{padding:5px 13px;border-radius:6px;border:1px solid var(--bd);background:var(--s2);font-size:11px;font-weight:700;cursor:pointer;color:var(--muted2);transition:all .15s;}
.promo-btn.on{border-color:var(--g);color:var(--g);background:rgba(0,245,196,.07);}
@keyframes spin{to{transform:rotate(360deg)}}
`;


/* ─── DATA ─────────────────────────────────────── */
const TICKERS=[
  {sym:"V75",val:"12,450",ch:"+2.1%",up:true},{sym:"BOOM1K",val:"7,841",ch:"+3.2%",up:true},
  {sym:"V10",val:"1,243",ch:"+0.8%",up:true},{sym:"CRASH500",val:"3,890",ch:"-1.1%",up:false},
  {sym:"V25",val:"4,821",ch:"+1.4%",up:true},{sym:"V50",val:"9,302",ch:"-0.6%",up:false},
  {sym:"BOOM500",val:"4,120",ch:"+1.8%",up:true},{sym:"CRASH1K",val:"6,330",ch:"-2.4%",up:false},
  {sym:"V100",val:"18,821",ch:"-1.2%",up:false},{sym:"STEP",val:"820",ch:"+0.2%",up:true},
  {sym:"JUMP10",val:"2,940",ch:"+0.9%",up:true},{sym:"JUMP25",val:"5,118",ch:"-0.4%",up:false},
];

const SIGNALS=[
  {sym:"V75",full:"Volatility 75 Index",signal:"COMPRA",conf:88,entry:"12,380",tp:"12,850",sl:"12,100",tf:"5M",risk:"Médio"},
  {sym:"BOOM1K",full:"Boom 1000 Index",signal:"VENDA",conf:81,entry:"7,900",tp:"7,600",sl:"8,050",tf:"1M",risk:"Alto"},
  {sym:"V10",full:"Volatility 10 Index",signal:"COMPRA",conf:93,entry:"1,228",tp:"1,270",sl:"1,205",tf:"15M",risk:"Baixo"},
  {sym:"CRASH500",full:"Crash 500 Index",signal:"AGUARDAR",conf:62,entry:"—",tp:"3,720",sl:"4,010",tf:"5M",risk:"Médio"},
  {sym:"V50",full:"Volatility 50 Index",signal:"COMPRA",conf:75,entry:"9,210",tp:"9,600",sl:"9,000",tf:"5M",risk:"Médio"},
  {sym:"BOOM500",full:"Boom 500 Index",signal:"VENDA",conf:79,entry:"4,180",tp:"3,980",sl:"4,250",tf:"1M",risk:"Alto"},
  {sym:"CRASH1K",full:"Crash 1000 Index",signal:"COMPRA",conf:83,entry:"6,280",tp:"6,550",sl:"6,100",tf:"5M",risk:"Médio"},
  {sym:"V25",full:"Volatility 25 Index",signal:"COMPRA",conf:71,entry:"4,750",tp:"4,920",sl:"4,650",tf:"15M",risk:"Baixo"},
];

const PROP_FIRMS=[
  {name:"TradingPlus",emoji:"🇲🇿",color:"#00f5c4",bg:"rgba(0,245,196,.12)",tag:"PARCEIRO OFICIAL",rating:"⭐⭐⭐⭐⭐",
   feats:["Focado em Moçambique e África","M-Pesa, e-Mola e USDT","Suporte 100% em Português","Capital até $50,000","Sem taxa recorrente"],
   code:"ARENA",disc:"20% desconto exclusivo",comm:"Ganha $25 por referido"},
  {name:"FTMO",emoji:"🏆",color:"#ffb830",bg:"rgba(255,184,48,.12)",tag:"MAIS POPULAR",rating:"⭐⭐⭐⭐⭐",
   feats:["Até $200,000 de capital","Lucro 80/20","Sem limite de tempo","Suporte 24/7","Crypto e transferência"],
   code:"ARENA15",disc:"15% desconto",comm:"Ganha $30 por referido"},
  {name:"FundingPips",emoji:"💧",color:"#38bdf8",bg:"rgba(56,189,248,.12)",tag:"MELHOR CUSTO",rating:"⭐⭐⭐⭐",
   feats:["Taxas mais baixas do mercado","Contas $5K–$200K","Pagamento semanal","EA e copy trading","Scaling automático"],
   code:"FPHUB20",disc:"20% desconto",comm:"Ganha $20 por referido"},
  {name:"FundedNext",emoji:"🚀",color:"#c084fc",bg:"rgba(192,132,252,.12)",tag:"LUCRO 90%",rating:"⭐⭐⭐⭐",
   feats:["Lucro 90/10 plano Stellar","Avaliação acessível","Crypto e índices","USDT e BTC","Capital até $300,000"],
   code:"FNHUB",disc:"12% desconto",comm:"Ganha $22 por referido"},
];

const STRATS=[
  {id:"beginner",cat:"fundamentos",emoji:"🌱",color:"#00e676",bg:"rgba(0,230,118,.08)",level:"COMEÇA AQUI",
   title:"Manual do Iniciante — Do Zero ao Avançado",
   markets:["Todos os mercados"],dur:"Lê antes de qualquer outra coisa",
   summary:"Se és novo no trading, este é o teu ponto de partida obrigatório. O que é o mercado, como funciona, vocabulário essencial, como abrir a primeira conta demo, como ler um gráfico de velas, os 5 erros fatais e como escolher o teu mercado de foco.",
   concepts:["O que é o mercado financeiro e como funciona","Tipos de mercado: Forex, Índices, Crypto, Commodities, Deriv","Pips, lotes, spread, alavancagem e margem — explicados simplesmente","Como funciona uma corretora (broker) e como escolher","Long (compra) vs Short (venda)","Como ler um gráfico de candlesticks (velas japonesas)","Timeframes M1, M5, M15, H1, H4, D1 — quando usar cada um","Os 5 erros que destroem 90% dos iniciantes"],
   steps:[
     {n:1,t:"Entende o que é o trading",d:"Trading é comprar e vender activos financeiros para lucrar com a diferença de preço. Não é jogo de azar — é uma profissão com regras, estatísticas e disciplina. Quem trata como jogo, perde como no jogo."},
     {n:2,t:"Aprende o vocabulário essencial",d:"PIP: menor variação de preço. LOTE: tamanho da posição. SPREAD: diferença entre compra e venda (custo da operação). ALAVANCAGEM: operar mais do que tens — amplifica GANHOS e PERDAS. MARGEM: depósito para abrir posição alavancada."},
     {n:3,t:"Abre uma conta DEMO primeiro",d:"Antes de usar dinheiro real, opera numa conta demo durante 30–60 dias mínimo. Trata a demo como dinheiro real — se não lucrares na demo, não lucrarás no real. É gratuita em qualquer broker."},
     {n:4,t:"Aprende a ler um gráfico de velas",d:"Uma vela mostra 4 dados: abertura, fecho, máximo e mínimo. Vela verde = preço subiu. Vela vermelha = preço caiu. O corpo é a diferença entre abertura e fecho. As sombras (wicks) mostram os extremos."},
     {n:5,t:"Escolhe UM mercado para começar",d:"Não tentes operar tudo ao mesmo tempo. Escolhe um: Deriv (índices sintéticos 24/7), Forex (EUR/USD), ou Crypto (BTC). Domina um completamente antes de passar ao próximo."},
     {n:6,t:"Define as tuas regras antes do 1º trade",d:"Antes do primeiro trade real: (1) Qual o máximo que posso perder por dia? (2) Quantas operações faço por sessão? (3) Qual o meu R:R mínimo? Sem regras escritas, as emoções decidem por ti."},
   ],
   tips:["90% dos iniciantes perdem nos primeiros 3 meses — não porque é impossível, mas porque saltam a aprendizagem","Nunca deposites dinheiro que não podes perder","A demo não é para praticar — é para provar que a estratégia funciona antes de arriscar capital","O maior inimigo do trader és tu mesmo — controlo emocional é 50% do sucesso","Começa com micro lotes mesmo na conta real. Preservar capital é mais importante que lucrar depressa"],
   mentors:["Rafael M.","Lara F."],wr:"—"},

  {id:"smc",cat:"avancado",emoji:"🏦",color:"#00f5c4",bg:"rgba(0,245,196,.08)",level:"Avançado",
   title:"SMC — Smart Money Concepts",
   markets:["Forex","Índices","Crypto","Commodities"],dur:"~4 semanas para dominar",
   summary:"SMC ensina a pensar como os grandes players institucionais — bancos, hedge funds. Aprendes a ler as pegadas do dinheiro inteligente: onde acumula, manipula e distribui posições.",
   concepts:["Order Blocks (OB) — zonas onde instituições colocaram ordens massivas","Break of Structure (BOS) e Change of Character (CHoCH)","Liquidity Grabs — caçada de stops antes do movimento real","Fair Value Gaps (FVG) — desequilíbrios que o preço tende a preencher","Premium & Discount Zones — comprar barato, vender caro","Inducement — armadilhas para traders de retalho"],
   steps:[
     {n:1,t:"Mapear estrutura no HTF",d:"No H4 ou D1, identifica a tendência macro usando BOS. Cada Break of Structure confirma a direcção institucional. Só operas na direcção do HTF."},
     {n:2,t:"Identificar Order Blocks",d:"Um OB é a última vela contrária antes de um BOS forte. Marca estas zonas — é onde as instituições voltarão a entrar."},
     {n:3,t:"Aguardar retorno ao OB",d:"Após o BOS, espera que o preço retraia até ao Order Block. Na zona, procura confirmação no LTF (M15 ou M5)."},
     {n:4,t:"Confirmar CHoCH no LTF",d:"Dentro do OB, espera um Change of Character no M5 — mini-inversão confirmando que as instituições absorvem o preço."},
     {n:5,t:"Entrada, SL e TP",d:"SL abaixo do OB (nunca dentro). TP1 na próxima zona de liquidez. TP2 no nível HTF. R:R mínimo 1:3."},
   ],
   tips:["SMC não funciona em índices sintéticos Deriv — aplica em Forex, Índices reais e Crypto","O liquidity grab (falso rompimento) é o setup mais poderoso do SMC","2-3 trades SMC por semana com R:R 1:3 superam 20 trades mediocres","Nunca entres no OB sem aguardar confirmação do LTF"],
   mentors:["Rafael M.","Diego A."],wr:"72–82%"},

  {id:"price-action",cat:"tecnica",emoji:"📊",color:"#38bdf8",bg:"rgba(56,189,248,.08)",level:"Intermédio",
   title:"Price Action Puro",
   markets:["Forex","Índices","Crypto","Deriv — V75/STEP"],dur:"~2 semanas para dominar",
   summary:"Opera apenas com o movimento puro do preço, sem indicadores. Identifica padrões de velas, suporte/resistência e estrutura de mercado para entradas de alta probabilidade em qualquer activo.",
   concepts:["Padrões: Pin Bar, Engolfo, Doji, Inside Bar, Morning/Evening Star","Suporte e Resistência horizontal e dinâmica","Estrutura: Higher Highs / Higher Lows (tendência alta)","Zonas de oferta (supply) e procura (demand)","Confluência de timeframes"],
   steps:[
     {n:1,t:"Ler a estrutura no H1",d:"Determina se está em tendência (HH/HL ou LH/LL) ou em range. Esta leitura define a direcção das operações."},
     {n:2,t:"Identificar zonas-chave",d:"Marca suporte e resistência mais recentes. Zonas onde o preço reagiu com força pelo menos 2 vezes."},
     {n:3,t:"Aguardar padrão de confirmação",d:"Espera que o preço chegue à zona e forme um padrão: Pin Bar com sombra longa rejeitando o nível, ou Engolfo no fecho."},
     {n:4,t:"Entrada e gestão",d:"Entra no fecho da vela de confirmação. SL 5-10 pips além da sombra. TP no próximo nível com R:R mínimo 1:2."},
   ],
   tips:["Nunca entres no meio de uma vela — espera sempre o fecho","1 setup perfeito é melhor que 5 mediocres","EUR/USD e GBP/USD têm movimentos limpos para Price Action","No Deriv, V75 e Step Index respeitam bem as zonas S/R"],
   mentors:["Diego A.","Rafael M."],wr:"78–85%"},

  {id:"crt",cat:"avancado",emoji:"🕯️",color:"#c084fc",bg:"rgba(192,132,252,.08)",level:"Avançado",
   title:"CRT — Candle Range Theory",
   markets:["Forex","Índices","Crypto","Commodities"],dur:"~3 semanas para dominar",
   summary:"A CRT analisa a estrutura interna de cada vela para prever o movimento seguinte. Foca em como as velas se formam, onde a liquidez se acumula dentro de cada candle e como as manipulações ocorrem nos extremos.",
   concepts:["True Range vs Body Range","High/Low da vela como zonas de liquidez internas","Manipulação intracandle — o preço falsifica antes de mover","Candle Range Expansion — breakouts do range anterior","Sessões e impacto no range (Asian, London, NY)","Correlação entre velas HTF e movimento LTF"],
   steps:[
     {n:1,t:"Identificar o range da vela HTF",d:"No H4 ou D1, marca o High e Low da vela mais recente. Este é o campo de batalha onde o preço vai manipular antes de decidir direcção."},
     {n:2,t:"Observar manipulação no LTF",d:"No M15 ou M5, observa como o preço testa os extremos da vela HTF. Teste do Low com rejeição forte = movimento para o High."},
     {n:3,t:"Confirmar direcção com sessão",d:"A sessão de Londres (08h-12h UTC) tende a definir a direcção do dia. Se London caçou o Low asiático e rejeitou, espera alta para NY."},
     {n:4,t:"Entrada pós-manipulação",d:"Após a caçada de liquidez, entra na direcção contrária. SL além do extremo manipulado. TP no extremo oposto da vela HTF."},
   ],
   tips:["CRT funciona melhor em Forex durante sessões Londres e NY","A sessão asiática cria o range — Londres e NY consomem a liquidez dos extremos","Quanto maior o TF da vela de referência, mais fiável o setup","Combina CRT com SMC para identificar qual extremo vai ser caçado primeiro"],
   mentors:["Rafael M."],wr:"70–78%"},

  {id:"falcon",cat:"tecnica",emoji:"🦅",color:"#ffb830",bg:"rgba(255,184,48,.08)",level:"Intermédio",
   title:"Falcon Strategy",
   markets:["Forex","Índices","Crypto","Deriv"],dur:"~2 semanas para dominar",
   summary:"Sistema de entrada baseado em confluência: estrutura + zona institucional + confirmação de vela. O nome vem da precisão do ataque — espera e ataca no momento certo, nunca antes.",
   concepts:["Top-Down Analysis — do maior para o menor TF","Zona de interesse (POI — Point of Interest)","Entrada em 3 confirmações: zona + estrutura + vela","Gestão com BE automático em TP1","Trailing stop após TP1","Filtro de tendência semanal"],
   steps:[
     {n:1,t:"Análise semanal — definir viés",d:"Todos os domingos, analisa o W1 dos activos. Define se o viés é bullish, bearish ou neutro. Só operas na direcção do W1."},
     {n:2,t:"Identificar POI no D1 ou H4",d:"Dentro do viés semanal, identifica a zona de interesse mais próxima: OB, S/R forte ou FVG. Esta é a tua zona de caça."},
     {n:3,t:"Aguardar no POI — M15",d:"Quando o preço chegar ao POI, muda para M15. Observa o comportamento: rejeição, consolidação ou aceleração? Só entras com rejeição clara."},
     {n:4,t:"Confirmar no M5 e entrar",d:"No M5, procura CHoCH ou Engolfo forte após rejeição no POI. Entra no fecho da vela confirmadora."},
     {n:5,t:"Gerir com Falcon Rules",d:"SL abaixo do POI. TP1 em 1:1 — move SL para BE. TP2 em 1:3. Com impulso, usa trailing para TP3 em 1:5+."},
   ],
   tips:["A paciência é o núcleo da Falcon — podes esperar dias pelo setup perfeito","Sem 3 confluências, não há trade","O filtro semanal elimina 80% dos trades perdedores — nunca o ignores","Falcon funciona em todos os mercados mas brilha em Forex de alta liquidez"],
   mentors:["Diego A.","Beatriz C."],wr:"75–83%"},

  {id:"fundamental",cat:"fundamental",emoji:"📰",color:"#fb923c",bg:"rgba(251,146,60,.08)",level:"Intermédio",
   title:"Análise Fundamentalista & Notícias",
   markets:["Forex","Índices","Commodities","Acções","Crypto"],dur:"~3 semanas de estudo contínuo",
   summary:"Opera com base em notícias económicas, dados macroeconómicos e eventos globais. Enquanto a análise técnica lê o gráfico, a fundamentalista responde: PORQUÊ o mercado se move. Os melhores traders combinam as duas.",
   concepts:["Calendário económico — NFP, CPI, PIB, taxas de juro, PMI","Política monetária: Fed, BCE, BoE, BoJ","Correlações: USD vs Ouro, DXY vs EUR/USD","Risk-On vs Risk-Off — como o sentimento move os mercados","Earnings seasons e impacto nos índices (S&P500, NASDAQ)","Geopolítica e commodities: petróleo, metais"],
   steps:[
     {n:1,t:"Consultar calendário económico diário",d:"Antes de operar, verifica eventos de alto impacto (vermelho) no Forex Factory. Evita estar no mercado 30 min antes e depois de eventos importantes — salvo estratégia específica."},
     {n:2,t:"Analisar o contexto macro",d:"Fed hawkish (sobe taxas) = USD forte = EUR/USD cai. Mantém sempre presente o contexto dos bancos centrais — é a força mais poderosa do Forex."},
     {n:3,t:"Operar o evento com gestão especial",d:"Para traders de notícias: coloca ordens buy stop e sell stop 15 pips acima e abaixo do preço antes do dado. Cancela a que não activar. SL apertado de 20 pips."},
     {n:4,t:"Confirmar com análise técnica",d:"Após o evento, usa Price Action ou SMC para confirmar direcção. Dado positivo para USD + zona técnica de suporte = entrada de compra de alta qualidade."},
   ],
   tips:["NFP (1ª sexta de cada mês) é o evento mais volátil do Forex — trata com muito respeito","A reacção ao dado importa mais que o dado em si — buy the rumour, sell the news","Segue Fed, BCE e BOE no Twitter/X para comunicados em tempo real","Para índices: Fed sobe taxas bruscamente = S&P500 cai — aprende estas correlações"],
   mentors:["Lara F.","Rafael M."],wr:"Variável — depende da gestão no evento"},

  {id:"snr",cat:"tecnica",emoji:"🧱",color:"#00e676",bg:"rgba(0,230,118,.08)",level:"Iniciante",
   title:"Suporte & Resistência",
   markets:["Todos os mercados","Deriv — todos os índices"],dur:"~1 semana para dominar",
   summary:"A base de toda a análise técnica. Identificar zonas onde o preço historicamente respeitou é a fundação sobre a qual todas as outras estratégias assentam. Ideal para quem está a começar.",
   concepts:["Suporte horizontal — piso onde compradores dominam","Resistência horizontal — tecto onde vendedores dominam","Teste e reteste após rompimento","Zonas psicológicas (números redondos: 1.1000, 12000)","Confluência com médias móveis dinâmicas"],
   steps:[
     {n:1,t:"Marcar níveis no H1",d:"Identifica os 3 suportes e 3 resistências mais relevantes dos últimos 30 dias. Usa linhas horizontais, não diagonais."},
     {n:2,t:"Descer para M15 — entrada precisa",d:"Quando o preço se aproximar da zona, muda para M15. Procura rejeição clara: sombra longa, engolfo ou doji na zona."},
     {n:3,t:"Confirmar e entrar",d:"Entra no fecho da vela confirmadora. SL 10-15 pips além da zona. TP no nível oposto."},
     {n:4,t:"Gerir a posição",d:"TP1 no meio do range (move SL para BE). TP2 no S/R oposto. Nunca moves o SL para pior."},
   ],
   tips:["Quanto mais vezes o preço testou uma zona, mais forte ela fica","Números redondos são zonas psicológicas poderosas em todos os mercados","No Deriv, o Step Index é o índice que melhor respeita S/R horizontal"],
   mentors:["Rafael M.","Lara F.","Diego A."],wr:"72–80%"},

  {id:"trend",cat:"tecnica",emoji:"📈",color:"#38bdf8",bg:"rgba(56,189,248,.08)",level:"Iniciante",
   title:"Seguimento de Tendência",
   markets:["Forex","Índices","Crypto","Deriv — V75/V100/BOOM"],dur:"~1 semana para dominar",
   summary:"A tendência é tua amiga — até terminar. Identifica tendências fortes, entra nos pullbacks e deixa o lucro correr. A estratégia mais simples e rentável para quem está a aprender.",
   concepts:["MA20 e MA50 como filtro de tendência","Pullback — recuo temporário numa tendência forte","Retracção de Fibonacci (38.2%, 50%, 61.8%)","Trailing Stop para maximizar lucros","Volume como confirmação da tendência"],
   steps:[
     {n:1,t:"Confirmar tendência com MAs",d:"MA20 acima de MA50 e ambas a subir = tendência de alta. Opera apenas compras. O oposto para baixa."},
     {n:2,t:"Aguardar o pullback",d:"Espera que o preço recue até à MA20 ou à zona 50% de Fibonacci do último swing de alta."},
     {n:3,t:"Confirmar retomada",d:"Vela de alta forte (corpo grande, fechando no topo) confirmando que o pullback terminou."},
     {n:4,t:"Entrada com trailing stop",d:"Entra na confirmação. Trailing stop de 20-30 pips. Fecha 50% em TP1 (próxima resistência), deixa 50% correr."},
   ],
   tips:["O V100 no Deriv tem as tendências mais longas — ideal para esta estratégia","Nunca tentes apanhar o topo ou o fundo — entra sempre no meio","Em Crypto, Bitcoin em tendência forte pode superar todas as expectativas — usa trailing"],
   mentors:["Rafael M.","Diego A."],wr:"70–78%"},

  {id:"scalping",cat:"avancado",emoji:"⚡",color:"#ff3d6b",bg:"rgba(255,61,107,.08)",level:"Avançado",
   title:"Scalping",
   markets:["Forex — sessão Londres/NY","Deriv — BOOM/CRASH/V10","Crypto — BTC/ETH"],dur:"~3 semanas para dominar",
   summary:"Estratégia de curtíssimo prazo, movimentos de 10–50 pips. Requer disciplina de ferro, execução rápida, broker de spreads baixos e controlo emocional absoluto. Alto risco, alta recompensa se executado bem.",
   concepts:["Timeframes M1 e M5 — cada segundo conta","Spread e comissão — fundamental para escolher broker","Momentum e velocidade do preço","Micro-zonas de S/R no M1","Regra dos 3 stops — controlo emocional rigoroso"],
   steps:[
     {n:1,t:"Escolher activo e sessão",d:"Forex: EUR/USD durante sobreposição Londres-NY (13h-16h UTC). Deriv: Boom/Crash e V10 a qualquer hora. Crypto: BTC nas primeiras 2h da sessão americana."},
     {n:2,t:"Identificar micro-zonas no M1",d:"Consolidações de 5–10 velas no M1. Rompimento limpo desta zona com impulso = sinal de entrada."},
     {n:3,t:"Executar com velocidade",d:"Entra no rompimento. TP: 15–30 pips. SL: máximo 15 pips. Não hesites — no scalping, a hesitação é cara."},
     {n:4,t:"Regra dos 3 stops",d:"3 trades perdidos seguidos = fecha o terminal e volta amanhã. Revenge trading no scalping é a forma mais rápida de perder a conta."},
   ],
   tips:["Spread alto mata o scalping — usa broker ECN com spread abaixo de 0.8 pips no EUR/USD","No Deriv, Boom e Crash têm picos aleatórios — SL sempre, sem excepção","Máx 5-8 operações por sessão para manter a clareza mental","Scalping não é para iniciantes — domina primeiro Price Action e S/R"],
   mentors:["Beatriz C."],wr:"60–72%"},

  {id:"risk",cat:"fundamentos",emoji:"🛡️",color:"#c084fc",bg:"rgba(192,132,252,.08)",level:"🔴 OBRIGATÓRIO",
   title:"Gestão de Risco & Capital",
   markets:["Todos os mercados — sem excepção"],dur:"Lê antes de fazer qualquer operação",
   summary:"A estratégia mais importante de todas. 90% dos traders que perdem fazem-no por má gestão de risco — não por má análise. Este manual define as regras que protegem o capital e tornam o trading sustentável.",
   concepts:["Regra dos 1–2% — nunca arrisques mais de 2% por trade","Cálculo de posição (position sizing)","Rácio Risk/Reward (R:R) — mínimo 1:2","Drawdown máximo diário — regra dos 5%","Diário de trading — a ferramenta mais poderosa","Psicologia: medo, ganância e revenge trading"],
   steps:[
     {n:1,t:"Define o risco máximo por trade",d:"Nunca arrisques mais de 1-2% do saldo por operação. Com $500, o risco máximo é $10. Isto protege-te de séries de perdas."},
     {n:2,t:"Calcula o tamanho de posição SEMPRE",d:"Fórmula: (Saldo × % risco) ÷ SL em pips = tamanho do lote. Nunca saltas este cálculo. Usa calculadora online."},
     {n:3,t:"Define regra de stop diário",d:"Se perderes 5% num dia, fecha o terminal. Volta amanhã. Dias maus existem — o objectivo é sobreviver para o dia seguinte."},
     {n:4,t:"Mantém um diário de trading",d:"Regista cada operação: entrada, saída, motivo técnico, resultado e o que sentiste. Em 30 dias terás dados reais sobre os teus padrões de erro."},
   ],
   tips:["10 perdas seguidas é matematicamente possível com 70% de acerto — a gestão deve sobreviver","R:R 1:2 significa que podes lucrar mesmo com apenas 40% de acerto — faz as contas","Revenge trading (aumentar posição após perda) é o assassino de contas nº1","Avalia a tua estratégia em amostras de 50+ trades, não num único resultado"],
   mentors:["Lara F.","Rafael M."],wr:"—"},
];

const MENTORS_META={"Rafael M.":{c:"#00f5c4",bg:"rgba(0,245,196,.15)"},"Beatriz C.":{c:"#c084fc",bg:"rgba(192,132,252,.15)"},"Diego A.":{c:"#ffb830",bg:"rgba(255,184,48,.15)"},"Lara F.":{c:"#38bdf8",bg:"rgba(56,189,248,.15)"}};

const CHAT_CHANNELS=[
  {sec:"SINAIS",items:[{n:"v75-sinais",live:true},{n:"boom-crash",u:3},{n:"volatility-geral",u:0},{n:"step-jump",u:1}]},
  {sec:"MENTORES",items:[{n:"sala-rafael",live:true},{n:"sala-beatriz",u:0},{n:"sala-diego",u:2}]},
  {sec:"COMUNIDADE",items:[{n:"geral",u:5},{n:"resultados",u:0},{n:"iniciantes",u:0}]},
];

const MSGS=[
  {av:"🤖",n:"TradeBot",role:"bot",rc:"#38bdf8",rbg:"rgba(56,189,248,.15)",t:"10:32",txt:"🚨 NOVO SINAL GERADO",sig:{sym:"V75",type:"COMPRA",entry:"12,380",tp:"12,850",sl:"12,100",tf:"5M",conf:"88%"}},
  {av:"R",n:"Rafael M.",role:"mentor",rc:"#00f5c4",rbg:"rgba(0,245,196,.15)",t:"10:33",txt:"Entrada confirmada no V75. Vela M5 fechou acima da resistência. Gestão de risco: máx 2% da conta. 💪"},
  {av:"A",n:"Ana P.",role:null,rc:"#a78bfa",rbg:"rgba(167,139,250,.15)",t:"10:35",txt:"Entrei agora! TP1 já quase atingido 🙌"},
  {av:"L",n:"Lucas S.",role:null,rc:"#fb923c",rbg:"rgba(251,146,60,.15)",t:"10:36",txt:"Que setup bonito! Usando a prop TradingPlus com código ARENA. Recomendo!"},
  {av:"🤖",n:"TradeBot",role:"bot",rc:"#38bdf8",rbg:"rgba(56,189,248,.15)",t:"10:41",txt:"✅ TP1 atingido no V75 (+195 pips) — 67% do sinal executado com sucesso."},
];

const COURSES=[
  {e:"📊",c:"#00f5c4",bg:"from-emerald-900",m:"Rafael M.",t:"V75 & Boom — Do Zero ao Consistente",s:"1.2K",p:"1500 MT",r:"⭐⭐⭐⭐⭐",d:"4h 30min",l:18},
  {e:"💥",c:"#ff3d6b",bg:"from-red-900",m:"Beatriz C.",t:"Boom & Crash — Scalping Avançado",s:"890",p:"2000 MT",r:"⭐⭐⭐⭐⭐",d:"3h 15min",l:14},
  {e:"🦅",c:"#ffb830",bg:"from-amber-900",m:"Diego A.",t:"Falcon Strategy — Passo a Passo",s:"640",p:"1800 MT",r:"⭐⭐⭐⭐",d:"3h 00min",l:12},
  {e:"🛡️",c:"#c084fc",bg:"from-purple-900",m:"Lara F.",t:"Gestão de Capital e Risk Management",s:"670",p:"900 MT",r:"⭐⭐⭐⭐⭐",d:"2h 45min",l:10},
  {e:"🏦",c:"#38bdf8",bg:"from-blue-900",m:"Rafael M.",t:"SMC Completo — Smart Money Concepts",s:"530",p:"2200 MT",r:"⭐⭐⭐⭐⭐",d:"5h 00min",l:20},
  {e:"📰",c:"#fb923c",bg:"from-orange-900",m:"Lara F.",t:"Análise Fundamentalista & Notícias",s:"420",p:"1400 MT",r:"⭐⭐⭐⭐",d:"3h 30min",l:15},
];

const WALLETS={TRC20:"TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",ERC20:"0x71C7656EC7ab88b098defB751B7401B5f6d8976F",BEP20:"0x71C7656EC7ab88b098defB751B7401B5f6d8976F"};

const PLANS=[
  {name:"Aluno",pm:"60 MT",usd:"$1",ico:"🎓",hot:false,feats:["Acesso completo à plataforma","Todos os manuais de estratégias","Manual do iniciante — do zero ao avançado","Salas de mentores (taxa separada)","Chat da comunidade","Códigos promo das Prop Firms"]},
  {name:"Indicador Pro",pm:"600 MT",usd:"$10",ico:"📡",hot:true,feats:["Tudo do plano Aluno","Sinais automáticos — Boom 500 & 1000","Sinais automáticos — Crash 500 & 1000","Sinais automáticos — Volatility 10/25/50/75/100","Backtesting ao vivo (7–90 dias)","TP, SL, confiança e risco por sinal","Alertas em tempo real"]},
  {name:"Mentor",pm:"120 MT",usd:"$2",ico:"🏆",hot:false,feats:["Criar e gerir sala de aulas","Definir o teu preço","Publicar cursos no marketplace","Dashboard: alunos e receita","Transmissão ao vivo","M-Pesa, e-Mola e USDT","Certificação Traders Arena"]},
];

function genBt(seed){
  const d=[];let cum=0;
  for(let i=0;i<30;i++){const r=(Math.sin(i*seed+1)*0.5+0.5);const w=r>0.42;const p=w?Math.floor(r*120+40):-Math.floor((1-r)*60+10);cum+=p;d.push({day:i+1,win:w,p,cum});}
  return d;
}

/* ─── COMPONENTS ───────────────────────────────── */
function PayModal({plan,onClose}){
  const [method,setMethod]=useState("mpesa");
  const [phone,setPhone]=useState("");
  const [net,setNet]=useState("TRC20");
  const [txid,setTxid]=useState("");
  const [step,setStep]=useState("form");
  const go=()=>step==="form"?setStep("confirm"):setStep("success");
  return(
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal">
        <div className="modal-head">
          <div><div className="modal-title">PAGAMENTO</div><div className="modal-sub">{plan.name} · {plan.pm}/mês</div></div>
          <button className="close-x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {step==="success"?(
            <div className="succ-screen">
              <div className="succ-ico">✅</div>
              <div style={{fontSize:24,fontWeight:900,color:"var(--g)",marginBottom:8}}>Pagamento Confirmado!</div>
              <div style={{fontSize:13,color:"var(--muted2)"}}>O teu plano <strong>{plan.name}</strong> está activo.</div>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>REF: TA-{Math.random().toString(36).substring(2,10).toUpperCase()}</div>
              <button className="btn btn-g" style={{marginTop:20,width:"100%"}} onClick={onClose}>Ir para a plataforma →</button>
            </div>
          ):step==="confirm"?(
            <div>
              <div className="info-box">Confirmas o pagamento de <strong>{plan.pm}/mês</strong> via {method==="mpesa"?"M-Pesa":method==="emola"?"e-Mola":"USDT"}?</div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setStep("form")}>Voltar</button>
                <button className="btn btn-g" style={{flex:1}} onClick={go}>Confirmar</button>
              </div>
            </div>
          ):(
            <>
              <div className="pay-tabs">
                {[["mpesa","📱 M-Pesa"],["emola","🔵 e-Mola"],["usdt","🔶 USDT"]].map(([k,l])=>(
                  <button key={k} className={`pay-tab${method===k?" on":""}`} onClick={()=>setMethod(k)}>{l}</button>
                ))}
              </div>
              {method!=="usdt"?(
                <>
                  <div className="warn-box">{method==="mpesa"?"M-Pesa (Vodacom) — Número com +258 84":"e-Mola (Movitel apenas) — Número com +258 86"}</div>
                  <label className="f-label">NÚMERO {method==="mpesa"?"M-PESA":"E-MOLA"}</label>
                  <input className="f-input" placeholder={method==="mpesa"?"84 XXX XXXX":"86 XXX XXXX"} value={phone} onChange={e=>setPhone(e.target.value)}/>
                  <button className={`pay-btn ${method==="mpesa"?"pay-mpesa":"pay-emola"}`} onClick={go}>Pagar {plan.pm}</button>
                </>
              ):(
                <>
                  <div style={{marginBottom:10}}>
                    <div className="f-label">REDE</div>
                    <div className="net-opts">{["TRC20","ERC20","BEP20"].map(n=><button key={n} className={`net-opt${net===n?" on":""}`} onClick={()=>setNet(n)}>{n}</button>)}</div>
                  </div>
                  <div className="wallet-box">
                    <div style={{fontSize:9,color:"var(--muted)",marginBottom:4}}>ENDEREÇO DA CARTEIRA ({net})</div>
                    <div style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--g)",wordBreak:"break-all"}}>{WALLETS[net]}</div>
                  </div>
                  <label className="f-label">TXID DA TRANSACÇÃO</label>
                  <input className="f-input" placeholder="0x..." value={txid} onChange={e=>setTxid(e.target.value)}/>
                  <button className="pay-btn pay-usdt" onClick={go}>Confirmar USDT</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SignalsPage(){
  const [filter,setFilter]=useState("todos");
  const sc=s=>s==="COMPRA"?"buy":s==="VENDA"?"sell":"wait";
  const sb=s=>s==="COMPRA"?"sb-buy":s==="VENDA"?"sb-sell":"sb-wait";
  const sv=s=>s==="COMPRA"?"#00e676":s==="VENDA"?"#ff3d6b":"#ffb830";
  const shown=filter==="todos"?SIGNALS:filter==="boom"?SIGNALS.filter(s=>s.sym.startsWith("BOOM")):filter==="crash"?SIGNALS.filter(s=>s.sym.startsWith("CRASH")):SIGNALS.filter(s=>s.sym.startsWith("V"));
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">📡 Sinais do Indicador</div><div className="ph-s">Indicador exclusivo Traders Arena · Boom 500/1000 · Crash 500/1000 · Volatility 10/25/50/75/100 (Deriv)</div></div>
      <div style={{background:"rgba(0,245,196,.05)",border:"1px solid rgba(0,245,196,.2)",borderRadius:10,padding:"13px 16px",marginBottom:18,display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{fontSize:22}}>🤖</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>Indicador Automático Traders Arena — exclusivo Deriv</div>
          <div style={{fontSize:12,color:"var(--muted2)"}}>Cobre <strong style={{color:"var(--g)"}}>Boom 500, Boom 1000, Crash 500, Crash 1000 e Volatility 10/25/50/75/100</strong>. Para Forex, Crypto, Metais e Índices reais, consulta os <strong style={{color:"var(--gold)"}}>Manuais de Estratégias</strong> ou os mentores.</div>
        </div>
        <span className="tag tg">● AO VIVO</span>
      </div>
      <div className="kpi-row">
        <div className="kpi"><div className="kpi-l">Sinais activos</div><div className="kpi-v" style={{color:"var(--g)"}}>{SIGNALS.length}</div><div className="kpi-s up">↑ 3 novos hoje</div></div>
        <div className="kpi"><div className="kpi-l">Acerto (30 dias)</div><div className="kpi-v" style={{color:"#00e676"}}>89%</div><div className="kpi-s up">↑ +2% vs mês ant.</div></div>
        <div className="kpi"><div className="kpi-l">Índices cobertos</div><div className="kpi-v" style={{color:"var(--gold)",fontSize:18,fontFamily:"var(--mono)"}}>9 índices</div><div className="kpi-s" style={{color:"var(--muted2)"}}>Boom·Crash·Volatility</div></div>
        <div className="kpi"><div className="kpi-l">Último sinal</div><div className="kpi-v" style={{color:"var(--blue)",fontSize:18,fontFamily:"var(--mono)"}}>2 min</div><div className="kpi-s tg">● Tempo real</div></div>
      </div>
      <div className="tabs-bar">
        {[["todos","Todos"],["boom","Boom"],["crash","Crash"],["vol","Volatility"]].map(([k,l])=>(
          <button key={k} className={`tb${filter===k?" on":""}`} onClick={()=>setFilter(k)}>{l}</button>
        ))}
      </div>
      <div className="sig-grid">
        {shown.map((s,i)=>(
          <div key={i} className={`sig-card ${sc(s.signal)}`}>
            <div className="sig-top">
              <div><div className="sig-sym">{s.sym}</div><div className="sig-full">{s.full}</div></div>
              <div className={sb(s.signal)}>{s.signal}</div>
            </div>
            <div className="sig-rows">
              <div className="sig-row"><span className="sig-lbl">Entrada</span><span className="sig-val">{s.entry}</span></div>
              <div className="sig-row"><span className="sig-lbl">Take Profit</span><span className="sig-val" style={{color:"#00e676"}}>{s.tp}</span></div>
              <div className="sig-row"><span className="sig-lbl">Stop Loss</span><span className="sig-val" style={{color:"var(--red)"}}>{s.sl}</span></div>
              <div className="sig-row"><span className="sig-lbl">Timeframe</span><span className="sig-val">{s.tf}</span></div>
              <div className="sig-row"><span className="sig-lbl">Risco</span><span className="sig-val">{s.risk}</span></div>
            </div>
            <div className="conf-bar">
              <div className="conf-label"><span>Confiança</span><span style={{color:sv(s.signal)}}>{s.conf}%</span></div>
              <div className="conf-track"><div className="conf-fill" style={{width:s.conf+"%",background:s.conf>85?"var(--g)":s.conf>70?"var(--gold)":"var(--red)"}}/></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BacktestPage(){
  const indices=["V75","V50","V25","V10","V100","BOOM1K","BOOM500","CRASH1K","CRASH500"];
  const [idx,setIdx]=useState("V75");
  const [period,setPeriod]=useState("30");
  const [tf,setTf]=useState("M5");
  const [data,setData]=useState(()=>genBt(2.5));
  const run=()=>{setData(genBt(Math.random()*5+1));};
  const wins=data.filter(d=>d.win).length;
  const wr=Math.round(wins/data.length*100);
  const total=data.reduce((a,d)=>a+d.p,0);
  const maxCum=Math.max(...data.map(d=>d.cum));
  const minCum=Math.min(...data.map(d=>d.cum));
  const range=maxCum-minCum||1;
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🔬 Backtesting do Indicador</div><div className="ph-s">Testa o desempenho do indicador nos índices Deriv · Boom · Crash · Volatility</div></div>
      <div className="card" style={{marginBottom:20}}>
        <div className="card-h">⚙️ Configurar teste</div>
        <div className="bt-controls">
          <select className="bt-sel" value={idx} onChange={e=>setIdx(e.target.value)}>
            {indices.map(i=><option key={i}>{i}</option>)}
          </select>
          <select className="bt-sel" value={period} onChange={e=>setPeriod(e.target.value)}>
            {["7","14","30","60","90"].map(p=><option key={p} value={p}>{p} dias</option>)}
          </select>
          <select className="bt-sel" value={tf} onChange={e=>setTf(e.target.value)}>
            {["M1","M5","M15","H1"].map(t=><option key={t}>{t}</option>)}
          </select>
          <button className="btn btn-g" onClick={run}>▶ Executar</button>
        </div>
        <div className="bt-stats">
          <div className="bt-stat"><div className="bt-sl">Taxa de acerto</div><div className="bt-sv" style={{color:wr>70?"var(--g)":wr>55?"var(--gold)":"var(--red)"}}>{wr}%</div></div>
          <div className="bt-stat"><div className="bt-sl">Total de pips</div><div className="bt-sv" style={{color:total>0?"#00e676":"var(--red)"}}>{total>0?"+":""}{total}</div></div>
          <div className="bt-stat"><div className="bt-sl">Trades ganhos</div><div className="bt-sv" style={{color:"#00e676"}}>{wins}</div></div>
          <div className="bt-stat"><div className="bt-sl">Trades perdidos</div><div className="bt-sv" style={{color:"var(--red)"}}>{data.length-wins}</div></div>
        </div>
        <div className="chart-area">
          <svg width="100%" height="100%" className="chart-line" viewBox="0 0 600 160">
            <polyline fill="none" stroke="rgba(0,245,196,.2)" strokeWidth="1.5"
              points={data.map((d,i)=>`${i*(600/29)},${160-((d.cum-minCum)/range*140)}`).join(" ")}/>
            <polyline fill="none" stroke="var(--g)" strokeWidth="2"
              points={data.map((d,i)=>`${i*(600/29)},${160-((d.cum-minCum)/range*140)}`).join(" ")}/>
            {data.map((d,i)=>(
              <circle key={i} cx={i*(600/29)} cy={160-((d.cum-minCum)/range*140)} r="3" fill={d.win?"var(--g)":"var(--red)"}/>
            ))}
          </svg>
          <div style={{position:"absolute",top:8,left:14,fontSize:11,color:"var(--muted)"}}>{idx} · {period}d · {tf}</div>
        </div>
      </div>
    </div>
  );
}

function StrategiesPage(){
  const [active,setActive]=useState("beginner");
  const [cat,setCat]=useState("todos");
  const cats=[{k:"todos",l:"📚 Todos"},{k:"fundamentos",l:"🌱 Fundamentos"},{k:"tecnica",l:"📊 Técnica"},{k:"avancado",l:"🔥 Avançado"},{k:"fundamental",l:"📰 Notícias"}];
  const filtered=cat==="todos"?STRATS:STRATS.filter(s=>s.cat===cat);
  const strat=STRATS.find(s=>s.id===active)||STRATS[0];
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">📚 Manuais de Estratégias</div><div className="ph-s">Do zero ao avançado · SMC · Price Action · CRT · Falcon · Fundamentalista · Gestão de Risco</div></div>
      <div style={{background:"rgba(0,230,118,.05)",border:"1px solid rgba(0,230,118,.25)",borderRadius:10,padding:"13px 16px",marginBottom:14,cursor:"pointer",display:"flex",alignItems:"center",gap:12}} onClick={()=>{setActive("beginner");setCat("todos");}}>
        <div style={{fontSize:24}}>🌱</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:13,color:"#00e676",marginBottom:2}}>👆 COMEÇA AQUI — Manual do Iniciante: Do Zero ao Avançado</div>
          <div style={{fontSize:11,color:"var(--muted2)"}}>Novo no trading? Lê este manual primeiro. Vocabulário, mercados, conta demo, leitura de gráficos, erros a evitar.</div>
        </div>
        <span style={{fontSize:11,color:"#00e676",fontWeight:700,whiteSpace:"nowrap"}}>Ver →</span>
      </div>
      <div className="tabs-bar" style={{marginBottom:12}}>
        {cats.map(t=><button key={t.k} className={`tb${cat===t.k?" on":""}`} onClick={()=>setCat(t.k)}>{t.l}</button>)}
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div className="strat-layout">
          <div className="strat-list">
            {filtered.map(s=>(
              <div key={s.id} className={`strat-item${active===s.id?" on":""}`} onClick={()=>setActive(s.id)}>
                <div className="strat-icon">{s.emoji}</div>
                <div className="strat-title">{s.title}</div>
                <div><span className="tag" style={{background:s.bg,color:s.color,fontSize:9,border:`1px solid ${s.color}33`}}>{s.level}</span></div>
              </div>
            ))}
          </div>
          <div className="strat-detail">
            <div className="strat-hero" style={{background:strat.bg,borderColor:`${strat.color}33`}}>
              <div className="sh-icon">{strat.emoji}</div>
              <div style={{flex:1}}>
                <div className="sh-title">{strat.title}</div>
                <div className="sh-sub">{strat.summary}</div>
                <div className="sh-tags">
                  <span className="tag" style={{background:"var(--s3)",color:strat.color,border:`1px solid ${strat.color}33`}}>{strat.level}</span>
                  <span className="tag tgold">⏱ {strat.dur}</span>
                  {strat.wr!=="—"&&<span className="tag tg">🎯 {strat.wr} acerto</span>}
                </div>
              </div>
            </div>
            <div className="ss"><div className="ss-h">Mercados aplicáveis</div>
              <div className="mkt-chips">{strat.markets.map((m,i)=><span key={i} className="mkt-chip">{m}</span>)}</div>
            </div>
            <div className="ss"><div className="ss-h">O que vais aprender</div>
              <div className="concept-list">{strat.concepts.map((c,i)=><div key={i} className="concept-i">{c}</div>)}</div>
            </div>
            <div className="ss"><div className="ss-h">Passo a passo</div>
              <div className="steps-list">{strat.steps.map((s,i)=>(
                <div key={i} className="step-c">
                  <div className="step-n" style={{background:strat.bg,color:strat.color,border:`1px solid ${strat.color}33`}}>{s.n}</div>
                  <div><div className="step-t">{s.t}</div><div className="step-d">{s.d}</div></div>
                </div>
              ))}</div>
            </div>
            <div className="ss"><div className="ss-h">Dicas importantes</div>
              <div className="tips-list">{strat.tips.map((t,i)=><div key={i} className="tip-i"><span>💡</span>{t}</div>)}</div>
            </div>
            <div className="ss"><div className="ss-h">Mentores especializados</div>
              <div className="mentor-list">{strat.mentors.map((m,i)=>{
                const mm=MENTORS_META[m]||{c:"var(--g)",bg:"rgba(0,245,196,.15)"};
                return(
                  <div key={i} className="m-sug">
                    <div className="m-av" style={{background:mm.bg,color:mm.c}}>{m[0]}</div>
                    <div><div style={{fontSize:12,fontWeight:700}}>{m}</div><div style={{fontSize:10,color:"var(--muted)"}}>Especialista</div></div>
                    <button className="btn btn-outline" style={{fontSize:10,padding:"3px 9px",marginLeft:6}}>Ver sala →</button>
                  </div>
                );
              })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropFirmsPage(){
  const [copied,setCopied]=useState(null);
  const copy=(code)=>{navigator.clipboard?.writeText(code);setCopied(code);setTimeout(()=>setCopied(null),2000);};
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🏦 Prop Firms Parceiras</div><div className="ph-s">Usa os nossos códigos exclusivos e começa a operar capital real</div></div>
      <div className="prop-grid">
        {PROP_FIRMS.map((p,i)=>(
          <div key={i} className="prop-card">
            <div className="prop-header">
              <div className="prop-logo" style={{background:p.bg}}>{p.emoji}</div>
              <div style={{flex:1}}>
                <div className="prop-name">{p.name}</div>
                <div className="prop-rating">{p.rating}</div>
              </div>
              <span style={{fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:4,background:`${p.color}18`,color:p.color}}>{p.tag}</span>
            </div>
            <ul className="prop-feats">{p.feats.map((f,j)=><li key={j}>{f}</li>)}</ul>
            <div className="code-row">
              <div>
                <div style={{fontSize:9,color:"var(--muted)",marginBottom:2}}>CÓDIGO PROMO</div>
                <div className="code-val">{p.code}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:10,color:"var(--muted2)",marginBottom:3}}>{p.disc}</div>
                <button className="btn btn-outline" style={{fontSize:10,padding:"4px 10px"}} onClick={()=>copy(p.code)}>
                  {copied===p.code?"✓ Copiado!":"📋 Copiar"}
                </button>
              </div>
            </div>
            <div className="prop-comm">{p.comm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPage(){
  const [ch,setCh]=useState("v75-sinais");
  const [msg,setMsg]=useState("");
  const [msgs,setMsgs]=useState(MSGS);
  const ref=useRef(null);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=ref.current.scrollHeight;},[msgs]);
  const send=()=>{
    if(!msg.trim())return;
    setMsgs(m=>[...m,{av:"T",n:"Tu",role:null,rc:"var(--g)",rbg:"rgba(0,245,196,.15)",t:new Date().toLocaleTimeString("pt",{hour:"2-digit",minute:"2-digit"}),txt:msg}]);
    setMsg("");
  };
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">💬 Comunidade</div><div className="ph-s">Chat em tempo real · Sinais automáticos · Mentores ao vivo</div></div>
      <div className="chat-layout">
        <div className="ch-sidebar">
          {CHAT_CHANNELS.map((s,i)=>(
            <div key={i}>
              <div className="ch-sec">{s.sec}</div>
              {s.items.map((item,j)=>(
                <div key={j} className={`ch-item${ch===item.n?" on":""}`} onClick={()=>setCh(item.n)}>
                  {item.live&&<div className="ch-dot"/>}
                  <span># {item.n}</span>
                  {item.u>0&&<span className="ch-unread">{item.u}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="ch-main">
          <div className="ch-head"><span style={{color:"var(--g)"}}>●</span> #{ch}</div>
          <div className="ch-msgs" ref={ref}>
            {msgs.map((m,i)=>(
              <div key={i} className="msg">
                <div className="msg-av" style={{background:m.rbg,color:m.rc,width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{m.av}</div>
                <div className="msg-body">
                  <div className="msg-meta">
                    <span className="msg-name">{m.n}</span>
                    {m.role&&<span className="msg-role" style={{background:m.rbg,color:m.rc}}>{m.role.toUpperCase()}</span>}
                    <span className="msg-time">{m.t}</span>
                  </div>
                  <div className="msg-txt">{m.txt}</div>
                  {m.sig&&(
                    <div className="msg-sig">
                      <span style={{color:"var(--g)",fontWeight:700}}>{m.sig.sym}</span>
                      <span style={{color:m.sig.type==="COMPRA"?"var(--g)":"var(--red)",fontWeight:700}}>{m.sig.type}</span>
                      <span>Entrada: {m.sig.entry}</span>
                      <span style={{color:"var(--g)"}}>TP: {m.sig.tp}</span>
                      <span style={{color:"var(--red)"}}>SL: {m.sig.sl}</span>
                      <span>{m.sig.tf}</span>
                      <span style={{color:"var(--gold)"}}>{m.sig.conf}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="ch-input-row">
            <input className="ch-input" placeholder={`Mensagem em #${ch}...`} value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
            <button className="btn btn-g" onClick={send}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesPage({onBuy}){
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🎓 Academia</div><div className="ph-s">Cursos de mentores verificados · Acesso vitalício · 15% comissão marketplace</div></div>
      <div className="course-grid">
        {COURSES.map((c,i)=>(
          <div key={i} className="course-card">
            <div className="course-banner" style={{background:`linear-gradient(135deg,${c.c}22,var(--s3))`}}>
              <span style={{fontSize:44}}>{c.e}</span>
            </div>
            <div className="course-body">
              <div className="course-mentor">por {c.m}</div>
              <div className="course-title">{c.t}</div>
              <div className="course-meta">
                <span>{c.r}</span>
                <span>👥 {c.s} alunos</span>
                <span>⏱ {c.d}</span>
                <span>📖 {c.l} aulas</span>
              </div>
              <div className="course-price">{c.p}</div>
              <button className="btn btn-g" style={{width:"100%"}} onClick={()=>onBuy&&onBuy(c)}>Comprar acesso</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MentorsPage(){
  const mentors=[
    {n:"Rafael M.",sp:"SMC · Price Action · Trend",rating:"4.9",students:420,revenue:"38,400 MT",av:"R",c:"#00f5c4",bg:"rgba(0,245,196,.15)",live:true},
    {n:"Beatriz C.",sp:"Scalping · Boom & Crash",rating:"4.8",students:310,revenue:"28,200 MT",av:"B",c:"#c084fc",bg:"rgba(192,132,252,.15)",live:false},
    {n:"Diego A.",sp:"Falcon Strategy · Price Action",rating:"4.7",students:280,revenue:"22,500 MT",av:"D",c:"#ffb830",bg:"rgba(255,184,48,.15)",live:true},
    {n:"Lara F.",sp:"Gestão de Risco · Fundamentalista",rating:"4.9",students:190,revenue:"17,100 MT",av:"L",c:"#38bdf8",bg:"rgba(56,189,248,.15)",live:false},
  ];
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🏆 Mentores</div><div className="ph-s">Mentores verificados · Especialistas em diversas estratégias e mercados</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
        {mentors.map((m,i)=>(
          <div key={i} className="card" style={{cursor:"pointer"}}>
            <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:14}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:m.bg,color:m.c,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:20,flexShrink:0}}>{m.av}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:16,marginBottom:2}}>{m.n}</div>
                <div style={{fontSize:11,color:"var(--muted2)",marginBottom:5}}>{m.sp}</div>
                <div style={{display:"flex",gap:8}}>
                  <span className="tag tg">⭐ {m.rating}</span>
                  {m.live&&<span className="tag tg">● AO VIVO</span>}
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:10,marginBottom:14}}>
              <div style={{flex:1,background:"var(--s3)",borderRadius:8,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>ALUNOS</div>
                <div style={{fontFamily:"var(--mono)",fontWeight:700,color:"var(--g)"}}>{m.students}</div>
              </div>
              <div style={{flex:1,background:"var(--s3)",borderRadius:8,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"var(--muted)",marginBottom:3}}>RECEITA MÊS</div>
                <div style={{fontFamily:"var(--mono)",fontWeight:700,color:"var(--gold)",fontSize:13}}>{m.revenue}</div>
              </div>
            </div>
            <button className="btn btn-g" style={{width:"100%"}}>Entrar na sala</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Landing({onEnter,onPay}){
  const FEATURES=[
    {icon:"📡",title:"Indicador exclusivo Deriv",desc:"Sinais automáticos para Boom 500/1000, Crash 500/1000 e Volatility 10/25/50/75/100. TP, SL, confiança e nível de risco em tempo real.",badge:null},
    {icon:"📚",title:"10 Manuais de estratégias",desc:"SMC, Price Action, CRT, Falcon, Análise Fundamentalista, S/R, Tendência, Scalping, Gestão de Risco e Manual do Iniciante completo.",badge:"NOVO"},
    {icon:"🔬",title:"Backtesting ao vivo",desc:"Testa o indicador nos últimos 7 a 90 dias em qualquer índice Deriv. Vê a taxa de acerto antes de assinar.",badge:null},
    {icon:"🏦",title:"4 Prop Firms parceiras",desc:"TradingPlus, FTMO, FundingPips e FundedNext com códigos exclusivos e comissão por referido.",badge:null},
    {icon:"💬",title:"Comunidade activa",desc:"Chat em tempo real, bot de sinais automático, mentores ao vivo — sem sair da plataforma.",badge:null},
    {icon:"📲",title:"Pagamento 100% africano",desc:"M-Pesa, e-Mola (Movitel) e USDT. Sem cartão de crédito. Construído para Moçambique e África.",badge:null},
  ];
  return(
    <div className="landing">
      <div style={{padding:"12px 24px",border:"none",borderBottom:"1px solid var(--bd)",background:"var(--s1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontWeight:800,fontSize:17}}>Traders <span style={{color:"var(--g)"}}>Arena</span></div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-ghost" onClick={()=>onPay(PLANS[0])}>Ver planos</button>
          <button className="btn btn-g" onClick={onEnter}>Entrar →</button>
        </div>
      </div>
      <section className="hero">
        <div className="hero-bg"/><div className="hero-grid"/>
        <div className="badge-live"><div className="pulse"/>Traders Arena · Ao Vivo · Moçambique</div>
        <h1>A primeira<br/>super-app de<br/><em>trading africano</em></h1>
        <p className="hero-desc">Indicador exclusivo Boom/Crash/Volatility · Manuais SMC, CRT, Falcon, Fundamentalista · Mentores verificados · Prop Firms parceiras — tudo num só lugar.</p>
        <div className="hero-cta">
          <button className="btn btn-g btn-lg" onClick={onEnter}>Entrar na plataforma →</button>
          <button className="btn btn-outline btn-lg" onClick={()=>onPay(PLANS[0])}>Ver planos</button>
        </div>
        <div className="hero-stats">
          <div><div className="hs-n">1.2K+</div><div className="hs-l">Traders activos</div></div>
          <div><div className="hs-n">89%</div><div className="hs-l">Taxa de acerto</div></div>
          <div><div className="hs-n">48</div><div className="hs-l">Mentores</div></div>
          <div><div className="hs-n">10</div><div className="hs-l">Estratégias</div></div>
        </div>
      </section>
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKERS,...TICKERS].map((t,i)=>(
            <div key={i} className="tick">
              <span className="tick-sym">{t.sym}</span>
              <span className="tick-val">{t.val}</span>
              <span className={t.up?"up":"dn"}>{t.ch}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="sec">
        <div className="sec-wrap">
          <div className="sec-tag">O que nos diferencia</div>
          <h2 className="sec-h">Construído para traders africanos</h2>
          <p className="sec-p">Não existe nada igual em Moçambique nem em África. Uma plataforma completa — do sinal ao manual, da estratégia à prop firm.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f,i)=>(
            <div key={i} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
              {f.badge&&<div className="feat-new">{f.badge}</div>}
            </div>
          ))}
        </div>
      </section>
      <section className="sec alt">
        <div className="sec-wrap">
          <div className="sec-tag">Planos e preços</div>
          <h2 className="sec-h">Simples e acessível</h2>
          <p className="sec-p">Paga em Meticais, M-Pesa, e-Mola ou USDT. Cancela quando quiseres.</p>
        </div>
        <div className="plans-grid">
          {PLANS.map((p,i)=>(
            <div key={i} className={`plan-card${p.hot?" hot":""}`}>
              {p.hot&&<div className="plan-hot">⭐ MAIS POPULAR</div>}
              <div className="plan-ico">{p.ico}</div>
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.pm}</div>
              <div className="plan-usd">{p.usd}/mês · paga em MT, M-Pesa ou USDT</div>
              <ul className="plan-feats">{p.feats.map((f,j)=><li key={j}>{f}</li>)}</ul>
              <button className={`btn ${p.hot?"btn-g":"btn-outline"}`} style={{width:"100%"}} onClick={()=>onPay(p)}>Assinar {p.name}</button>
            </div>
          ))}
        </div>
      </section>
      <div className="footer">
        <div style={{fontWeight:800}}>Traders <span style={{color:"var(--g)"}}>Arena</span> <span style={{fontSize:11,color:"var(--muted)",fontWeight:400}}>· Moçambique · Africa</span></div>
        <div className="pay-bdgs">
          <div className="pay-bdg">📱 M-Pesa</div>
          <div className="pay-bdg">🔵 e-Mola</div>
          <div className="pay-bdg">🔶 USDT</div>
        </div>
      </div>
    </div>
  );
}

/* ─── NEW DATA ──────────────────────────────────── */
const LEAGUES=[
  {id:"bronze",name:"Bronze",icon:"🥉",color:"#cd7f32",bg:"rgba(205,127,50,.1)",pts:"0–999",min:0},
  {id:"silver",name:"Silver",icon:"🥈",color:"#c0c0c0",bg:"rgba(192,192,192,.1)",pts:"1000–2499",min:1000},
  {id:"gold",name:"Gold",icon:"🥇",color:"#ffd700",bg:"rgba(255,215,0,.1)",pts:"2500–4999",min:2500},
  {id:"diamond",name:"Diamond",icon:"💎",color:"#38bdf8",bg:"rgba(56,189,248,.1)",pts:"5000–9999",min:5000},
  {id:"legend",name:"Legend",icon:"👑",color:"#c084fc",bg:"rgba(192,132,252,.1)",pts:"10000+",min:10000},
];

const LEVELS=[
  {id:"beginner",name:"Beginner",icon:"🌱",xp:0,next:500,color:"#6a85a8"},
  {id:"intermediate",name:"Intermediate",icon:"📊",xp:500,next:1500,color:"#38bdf8"},
  {id:"pro",name:"Pro",icon:"🎯",xp:1500,next:4000,color:"#00f5c4"},
  {id:"elite",name:"Elite",icon:"⚡",xp:4000,next:10000,color:"#ffb830"},
  {id:"legend",name:"Legend",icon:"👑",xp:10000,next:null,color:"#c084fc"},
];

const LEADERBOARD=[
  {rank:1,flag:"🇲🇿",name:"Rafael M.",country:"Moçambique",wr:"91%",profit:"+$4,820",rr:"2.8",trades:142,pts:12400,league:"legend",av:"R",c:"#00f5c4",bg:"rgba(0,245,196,.15)",verified:true,followers:1240},
  {rank:2,flag:"🇧🇷",name:"Carlos V.",country:"Brasil",wr:"87%",profit:"+$3,610",rr:"2.5",trades:118,pts:9800,league:"diamond",av:"C",c:"#38bdf8",bg:"rgba(56,189,248,.15)",verified:true,followers:890},
  {rank:3,flag:"🇿🇦",name:"Thabo M.",country:"África do Sul",wr:"85%",profit:"+$2,940",rr:"2.2",trades:97,pts:8200,league:"diamond",av:"T",c:"#ffb830",bg:"rgba(255,184,48,.15)",verified:true,followers:640},
  {rank:4,flag:"🇳🇬",name:"Amaka O.",country:"Nigéria",wr:"83%",profit:"+$2,200",rr:"2.1",trades:88,pts:6700,league:"diamond",av:"A",c:"#c084fc",bg:"rgba(192,132,252,.15)",verified:false,followers:430},
  {rank:5,flag:"🇲🇿",name:"Beatriz C.",country:"Moçambique",wr:"82%",profit:"+$1,980",rr:"2.0",trades:74,pts:5800,league:"gold",av:"B",c:"#ff3d6b",bg:"rgba(255,61,107,.15)",verified:true,followers:380},
  {rank:6,flag:"🇬🇭",name:"Kwame A.",country:"Gana",wr:"79%",profit:"+$1,640",rr:"1.9",trades:66,pts:4900,league:"gold",av:"K",c:"#fb923c",bg:"rgba(251,146,60,.15)",verified:false,followers:290},
  {rank:7,flag:"🇲🇿",name:"Diego A.",country:"Moçambique",wr:"78%",profit:"+$1,420",rr:"1.8",trades:61,pts:4200,league:"gold",av:"D",c:"#ffb830",bg:"rgba(255,184,48,.15)",verified:true,followers:260},
  {rank:8,flag:"🇰🇪",name:"Wanjiru N.",country:"Quénia",wr:"76%",profit:"+$1,100",rr:"1.7",trades:54,pts:3600,league:"gold",av:"W",c:"#a78bfa",bg:"rgba(167,139,250,.15)",verified:false,followers:180},
  {rank:9,flag:"🇵🇹",name:"João F.",country:"Portugal",wr:"75%",profit:"+$920",rr:"1.6",trades:48,pts:2800,league:"silver",av:"J",c:"#38bdf8",bg:"rgba(56,189,248,.15)",verified:false,followers:140},
  {rank:10,flag:"🇲🇿",name:"Lara F.",country:"Moçambique",wr:"74%",profit:"+$780",rr:"1.7",trades:42,pts:2400,league:"silver",av:"L",c:"#38bdf8",bg:"rgba(56,189,248,.15)",verified:true,followers:120},
];

const FEED_POSTS=[
  {id:1,av:"R",name:"Rafael M.",c:"#00f5c4",bg:"rgba(0,245,196,.15)",time:"há 12 min",verified:true,league:"legend",
   content:"Setup SMC clássico no V75. Order Block no H4 + CHoCH no M5 = entrada precisa. Gestão: 1.5% de risco, R:R 1:3.2. 🎯",
   trade:{sym:"V75",type:"COMPRA",entry:"12,380",tp:"12,850",sl:"12,100",result:"+$142",pips:"+195"},
   likes:47,comments:12,liked:false},
  {id:2,av:"B",name:"Beatriz C.",c:"#c084fc",bg:"rgba(192,132,252,.15)",time:"há 34 min",verified:true,league:"gold",
   content:"Boom 1000 armadilha perfeita hoje. Liquidity grab no Low da sessão asiática seguido de spike clássico. Quem entrou junto comigo? 💥",
   trade:{sym:"BOOM1K",type:"VENDA",entry:"7,900",tp:"7,600",sl:"8,050",result:"+$88",pips:"+120"},
   likes:31,comments:8,liked:false},
  {id:3,av:"C",name:"Carlos V.",c:"#38bdf8",bg:"rgba(56,189,248,.15)",time:"há 1h",verified:true,league:"diamond",
   content:"Análise de domingo para a semana. Viés bearish no EUR/USD — Fed hawkish + DXY mostrando força. Aguardo reteste da zona 1.0820 para short. Partilha a tua análise 👇",
   trade:null,
   likes:89,comments:24,liked:true},
  {id:4,av:"D",name:"Diego A.",c:"#ffb830",bg:"rgba(255,184,48,.15)",time:"há 2h",verified:true,league:"gold",
   content:"Resultado da semana com a Falcon Strategy: 7 trades, 6 winners, 1 BE. Win Rate: 86%. Seguindo o filtro semanal à risca — nunca opero contra o W1. 🦅",
   trade:{sym:"GBP/USD",type:"VENDA",entry:"1.2731",tp:"1.2600",sl:"1.2790",result:"+$210",pips:"+131"},
   likes:63,comments:19,liked:false},
];

const COMPETITIONS=[
  {id:"monthly-champ",title:"Trading Championship Mensal",emoji:"🏆",color:"#ffd700",bg:"linear-gradient(135deg,rgba(255,215,0,.15),rgba(255,184,48,.08))",
   entryUSD:10,participants:240,maxParts:300,days:18,status:"ABERTO",
   margin:0.20,
   prizeDistrib:[{pos:"1º",pct:0.40,icon:"🥇",label:"1º lugar"},{pos:"2º",pct:0.20,icon:"🥈",label:"2º lugar"},{pos:"3º",pct:0.10,icon:"🥉",label:"3º lugar"},{pos:"Top 10",pct:0.03,icon:"🎖️",label:"4º–10º"}],
   maxPrizePerWinner:1500,
   desc:"O maior campeonato mensal da plataforma. Competes com traders de todo o mundo. Critério: maior % de lucro no mês."},
  {id:"weekly-sprint",title:"Weekly Sprint",emoji:"⚡",color:"#00f5c4",bg:"linear-gradient(135deg,rgba(0,245,196,.12),rgba(56,189,248,.06))",
   entryUSD:5,participants:96,maxParts:150,days:5,status:"ABERTO",
   margin:0.20,
   prizeDistrib:[{pos:"1º",pct:0.50,icon:"🥇",label:"1º lugar"},{pos:"2º",pct:0.25,icon:"🥈",label:"2º lugar"},{pos:"3º",pct:0.125,icon:"🥉",label:"3º lugar"}],
   maxPrizePerWinner:500,
   desc:"Competição semanal rápida. Entra na sexta, termina na sexta seguinte. Critério: maior % de lucro."},
  {id:"deriv-cup",title:"Deriv Synthetic Cup",emoji:"🇲🇿",color:"#c084fc",bg:"linear-gradient(135deg,rgba(192,132,252,.12),rgba(56,189,248,.06))",
   entryUSD:5,participants:64,maxParts:100,days:7,status:"ABERTO",
   margin:0.20,
   prizeDistrib:[{pos:"1º",pct:0.50,icon:"🥇",label:"1º lugar"},{pos:"2º",pct:0.25,icon:"🥈",label:"2º lugar"},{pos:"3º",pct:0.125,icon:"🥉",label:"3º lugar"}],
   maxPrizePerWinner:400,
   desc:"Exclusivo para índices Deriv (Boom, Crash, Volatility). O campeonato africano de índices sintéticos."},
];

const BATTLES=[
  {id:1,traderA:{name:"Rafael M.",av:"R",c:"#00f5c4",bg:"rgba(0,245,196,.15)",profit:"+8.4%",league:"legend"},
   traderB:{name:"Carlos V.",av:"C",c:"#38bdf8",bg:"rgba(56,189,248,.15)",profit:"+6.1%",league:"diamond"},
   days:3,totalDays:7,status:"AO VIVO",pctA:58,pctB:42},
  {id:2,traderA:{name:"Beatriz C.",av:"B",c:"#c084fc",bg:"rgba(192,132,252,.15)",profit:"+5.2%",league:"gold"},
   traderB:{name:"Diego A.",av:"D",c:"#ffb830",bg:"rgba(255,184,48,.15)",profit:"+5.9%",league:"gold"},
   days:5,totalDays:7,status:"AO VIVO",pctA:47,pctB:53},
];

const MARKETPLACE_ITEMS=[
  {emoji:"🤖",type:"ROBÔ MT5",title:"V75 Scalper EA",author:"Rafael M.",price:"$49",rating:"4.9",sales:142,color:"#00f5c4",bg:"rgba(0,245,196,.1)"},
  {emoji:"📊",type:"INDICADOR",title:"SMC Order Block Finder",author:"Diego A.",price:"$29",rating:"4.8",sales:89,color:"#38bdf8",bg:"rgba(56,189,248,.1)"},
  {emoji:"🦅",type:"ESTRATÉGIA",title:"Falcon Strategy Pack",author:"Diego A.",price:"$19",rating:"4.7",sales:214,color:"#ffb830",bg:"rgba(255,184,48,.1)"},
  {emoji:"📰",type:"CURSO",title:"Fundamentalista Avançado",author:"Lara F.",price:"$39",rating:"4.9",sales:67,color:"#fb923c",bg:"rgba(251,146,60,.1)"},
  {emoji:"🕯️",type:"INDICADOR",title:"CRT Auto Sessions",author:"Rafael M.",price:"$35",rating:"4.8",sales:55,color:"#c084fc",bg:"rgba(192,132,252,.1)"},
  {emoji:"🛡️",type:"FERRAMENTA",title:"Risk Calculator Pro",author:"Lara F.",price:"FREE",rating:"5.0",sales:890,color:"#00e676",bg:"rgba(0,230,118,.1)"},
];

const MY_PROFILE={
  name:"Trader",av:"T",flag:"🇲🇿",country:"Moçambique",
  level:"Pro",levelXp:2800,levelNext:4000,levelIcon:"🎯",levelColor:"#00f5c4",
  league:"gold",leagueIcon:"🥇",leagueColor:"#ffd700",
  pts:4200,rank:7,followers:260,following:48,
  wr:"78%",profit:"+$1,420",trades:61,rr:"1.8",drawdown:"6.2%",verified:true,
  badges:["✅ Verified","🦅 Falcon User","📡 Indicador Pro","🇲🇿 Top MZ"],
};

/* ─── ECONOMIC CALENDAR DATA & COMPONENT ──────── */

const CURRENCIES_META={
  USD:{flag:"🇺🇸",color:"#38bdf8",bg:"rgba(56,189,248,.12)"},
  EUR:{flag:"🇪🇺",color:"#c084fc",bg:"rgba(192,132,252,.12)"},
  GBP:{flag:"🇬🇧",color:"#fb923c",bg:"rgba(251,146,60,.12)"},
  JPY:{flag:"🇯🇵",color:"#ff3d6b",bg:"rgba(255,61,107,.12)"},
  AUD:{flag:"🇦🇺",color:"#00f5c4",bg:"rgba(0,245,196,.12)"},
  CAD:{flag:"🇨🇦",color:"#ffb830",bg:"rgba(255,184,48,.12)"},
  CHF:{flag:"🇨🇭",color:"#00e676",bg:"rgba(0,230,118,.12)"},
  NZD:{flag:"🇳🇿",color:"#a78bfa",bg:"rgba(167,139,250,.12)"},
};

// Static calendar data for a full week — structured by day
const CAL_EVENTS=[
  // MONDAY
  {id:1,day:"MON",date:"Mar 10",time:"09:00",currency:"EUR",event:"German Industrial Production m/m",impact:"medium",forecast:"-0.2%",previous:"+0.7%",actual:null,desc:"Monthly change in the total inflation-adjusted value of output produced by producers."},
  {id:2,day:"MON",date:"Mar 10",time:"10:00",currency:"EUR",event:"Eurozone Sentix Investor Confidence",impact:"low",forecast:"-12.4",previous:"-12.7",actual:null,desc:"Level of a diffusion index based on surveyed investors and analysts."},
  {id:3,day:"MON",date:"Mar 10",time:"15:00",currency:"USD",event:"Fed Chair Powell Speaks",impact:"high",forecast:"—",previous:"—",actual:null,desc:"Speech by the Federal Reserve Chair. Text of the speech may reveal clues about future monetary policy."},

  // TUESDAY
  {id:4,day:"TUE",date:"Mar 11",time:"00:30",currency:"AUD",event:"NAB Business Confidence",impact:"medium",forecast:"5",previous:"3",actual:null,desc:"Level of a diffusion index based on surveyed businesses."},
  {id:5,day:"TUE",date:"Mar 11",time:"09:00",currency:"GBP",event:"Claimant Count Change",impact:"medium",forecast:"8.4K",previous:"22.0K",actual:null,desc:"Change in the number of unemployed people claiming unemployment benefits."},
  {id:6,day:"TUE",date:"Mar 11",time:"10:00",currency:"EUR",event:"ZEW Economic Sentiment",impact:"high",forecast:"12.5",previous:"26.0",actual:null,desc:"Level of a diffusion index based on surveyed institutional investors and analysts."},
  {id:7,day:"TUE",date:"Mar 11",time:"13:30",currency:"USD",event:"Core CPI m/m",impact:"high",forecast:"0.3%",previous:"0.4%",actual:null,desc:"Change in the price of goods and services purchased by consumers, excluding food and energy."},
  {id:8,day:"TUE",date:"Mar 11",time:"13:30",currency:"USD",event:"CPI m/m",impact:"high",forecast:"0.3%",previous:"0.5%",actual:null,desc:"Change in the price of goods and services purchased by consumers."},
  {id:9,day:"TUE",date:"Mar 11",time:"13:30",currency:"USD",event:"CPI y/y",impact:"high",forecast:"2.9%",previous:"3.0%",actual:null,desc:"Change in the price of goods and services purchased by consumers compared to a year ago."},

  // WEDNESDAY
  {id:10,day:"WED",date:"Mar 12",time:"03:30",currency:"JPY",event:"GDP q/q",impact:"high",forecast:"-0.7%",previous:"+0.3%",actual:null,desc:"Change in the inflation-adjusted value of all goods and services produced by the economy."},
  {id:11,day:"WED",date:"Mar 12",time:"09:30",currency:"GBP",event:"GDP m/m",impact:"high",forecast:"0.1%",previous:"0.4%",actual:null,desc:"Monthly change in the inflation-adjusted value of all goods and services produced by the economy."},
  {id:12,day:"WED",date:"Mar 12",time:"10:00",currency:"EUR",event:"Industrial Production m/m",impact:"medium",forecast:"-0.1%",previous:"-1.1%",actual:null,desc:"Monthly change in the total inflation-adjusted value of output produced by producers."},
  {id:13,day:"WED",date:"Mar 12",time:"13:30",currency:"USD",event:"PPI m/m",impact:"medium",forecast:"0.3%",previous:"0.4%",actual:null,desc:"Change in the selling price of goods and services purchased by producers."},
  {id:14,day:"WED",date:"Mar 12",time:"15:30",currency:"USD",event:"Crude Oil Inventories",impact:"medium",forecast:"-2.0M",previous:"-0.7M",actual:null,desc:"Change in the number of barrels of crude oil held in inventory by commercial firms."},
  {id:15,day:"WED",date:"Mar 12",time:"19:00",currency:"USD",event:"FOMC Meeting Minutes",impact:"high",forecast:"—",previous:"—",actual:null,desc:"Detailed minutes of the Fed's policy-setting meeting."},

  // THURSDAY
  {id:16,day:"THU",date:"Mar 13",time:"08:30",currency:"CHF",event:"CPI m/m",impact:"medium",forecast:"0.6%",previous:"-0.1%",actual:null,desc:"Change in the price of goods and services purchased by consumers."},
  {id:17,day:"THU",date:"Mar 13",time:"12:15",currency:"EUR",event:"ECB Main Refinancing Rate",impact:"high",forecast:"2.65%",previous:"2.90%",actual:null,desc:"Interest rate on the main refinancing operations of the ECB."},
  {id:18,day:"THU",date:"Mar 13",time:"12:45",currency:"EUR",event:"ECB Press Conference",impact:"high",forecast:"—",previous:"—",actual:null,desc:"Press conference where the ECB's Governing Council discusses the economic outlook."},
  {id:19,day:"THU",date:"Mar 13",time:"13:30",currency:"USD",event:"Core Retail Sales m/m",impact:"high",forecast:"0.3%",previous:"-0.4%",actual:null,desc:"Change in the total value of sales at the retail level, excluding automobiles."},
  {id:20,day:"THU",date:"Mar 13",time:"13:30",currency:"USD",event:"Retail Sales m/m",impact:"high",forecast:"-0.1%",previous:"-0.9%",actual:null,desc:"Change in the total value of sales at the retail level."},
  {id:21,day:"THU",date:"Mar 13",time:"13:30",currency:"USD",event:"Unemployment Claims",impact:"medium",forecast:"226K",previous:"221K",actual:null,desc:"Number of individuals filing for unemployment insurance for the first time."},
  {id:22,day:"THU",date:"Mar 13",time:"15:00",currency:"USD",event:"Prelim UoM Consumer Sentiment",impact:"medium",forecast:"64.7",previous:"64.7",actual:null,desc:"Level of a composite index based on surveyed consumers."},

  // FRIDAY
  {id:23,day:"FRI",date:"Mar 14",time:"00:30",currency:"AUD",event:"Employment Change",impact:"high",forecast:"30.0K",previous:"44.3K",actual:null,desc:"Change in the number of employed people during the previous month."},
  {id:24,day:"FRI",date:"Mar 14",time:"00:30",currency:"AUD",event:"Unemployment Rate",impact:"high",forecast:"4.1%",previous:"4.1%",actual:null,desc:"Percentage of the total work force that is unemployed and actively seeking employment."},
  {id:25,day:"FRI",date:"Mar 14",time:"09:00",currency:"EUR",event:"Trade Balance",impact:"low",forecast:"14.1B",previous:"15.5B",actual:null,desc:"Difference in value between imported and exported goods."},
  {id:26,day:"FRI",date:"Mar 14",time:"13:30",currency:"CAD",event:"Employment Change",impact:"high",forecast:"20.0K",previous:"-2.8K",actual:null,desc:"Change in the number of employed people during the previous month."},
  {id:27,day:"FRI",date:"Mar 14",time:"13:30",currency:"CAD",event:"Unemployment Rate",impact:"high",forecast:"6.7%",previous:"6.6%",actual:null,desc:"Percentage of the total work force that is unemployed."},
  {id:28,day:"FRI",date:"Mar 14",time:"13:30",currency:"USD",event:"Non Farm Payrolls",impact:"high",forecast:"160K",previous:"143K",actual:null,desc:"Change in the number of employed people during the previous month, excluding the farming industry."},
  {id:29,day:"FRI",date:"Mar 14",time:"13:30",currency:"USD",event:"Unemployment Rate",impact:"high",forecast:"4.0%",previous:"4.0%",actual:null,desc:"Percentage of the total work force that is unemployed and actively seeking employment."},
  {id:30,day:"FRI",date:"Mar 14",time:"13:30",currency:"USD",event:"Average Hourly Earnings m/m",impact:"high",forecast:"0.3%",previous:"0.5%",actual:null,desc:"Change in the selling price of goods and services purchased by producers."},
  {id:31,day:"FRI",date:"Mar 14",time:"15:00",currency:"USD",event:"Prelim UoM Inflation Expectations",impact:"medium",forecast:"4.3%",previous:"4.3%",actual:null,desc:"Percentage that consumers expect the price of goods and services to change during the next 12 months."},
];

// Today is Wednesday March 12
const TODAY_DAY="WED";

function EconCalendar(){
  const [day,setDay]=useState("WED");
  const [currencies,setCurrencies]=useState([]);
  const [impact,setImpact]=useState("todos");
  const [expanded,setExpanded]=useState(null);
  const [alerts,setAlerts]=useState([
    {id:1,msg:"🔴 Alto Impacto em 15 min — JPY GDP q/q às 03:30",type:"high",currency:"JPY"},
    {id:2,msg:"🟠 Médio Impacto em 45 min — GBP GDP m/m às 09:30",type:"med",currency:"GBP"},
  ]);

  const days=[
    {k:"MON",l:"Seg",d:"Mar 10"},
    {k:"TUE",l:"Ter",d:"Mar 11"},
    {k:"WED",l:"Qua ★",d:"Mar 12"},
    {k:"THU",l:"Qui",d:"Mar 13"},
    {k:"FRI",l:"Sex",d:"Mar 14"},
  ];

  const allCurs=["USD","EUR","GBP","JPY","AUD","CAD","CHF","NZD"];

  const toggleCur=(c)=>setCurrencies(cs=>cs.includes(c)?cs.filter(x=>x!==c):[...cs,c]);

  let events=CAL_EVENTS.filter(e=>e.day===day);
  if(currencies.length>0) events=events.filter(e=>currencies.includes(e.currency));
  if(impact!=="todos") events=events.filter(e=>e.impact===impact);

  const highCount=events.filter(e=>e.impact==="high").length;
  const medCount=events.filter(e=>e.impact==="medium").length;

  const impClass={high:"imp-high",medium:"imp-med",low:"imp-low"};
  const impLabel={high:"🔴 Alto",medium:"🟠 Médio",low:"🟢 Baixo"};
  const impRow={high:"cal-row-high",medium:"cal-row-medium",low:"cal-row-low"};

  return(
    <div className="page">
      <div className="ph">
        <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
          <div className="ph-t">📅 Calendário Económico</div>
          <span className="live-dot"/><span style={{fontSize:11,color:"var(--g)",fontWeight:600}}>Ao vivo</span>
        </div>
        <div className="ph-s">Eventos económicos de alto impacto · Semana de 10–14 Março 2026 · Horários em UTC</div>
      </div>

      {/* ALERT BANNERS */}
      {day===TODAY_DAY && alerts.map(a=>(
        <div key={a.id} className={`alert-strip ${a.type==="high"?"alert-strip-high":"alert-strip-med"}`} style={{marginBottom:8}}>
          <div style={{fontSize:20,flexShrink:0}}>{a.type==="high"?"🚨":"⚠️"}</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:13,marginBottom:2}}>{a.type==="high"?"HIGH IMPACT NEWS ALERT":"MEDIUM IMPACT NEWS ALERT"}</div>
            <div style={{fontSize:12,color:"var(--muted2)"}}>{a.msg}</div>
          </div>
          <button onClick={()=>setAlerts(al=>al.filter(x=>x.id!==a.id))} style={{background:"transparent",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:16,flexShrink:0}}>✕</button>
        </div>
      ))}

      {/* KPI ROW */}
      <div className="kpi-row" style={{marginBottom:16}}>
        <div className="kpi">
          <div className="kpi-l">Eventos hoje</div>
          <div className="kpi-v" style={{color:"var(--txt)",fontSize:22}}>{CAL_EVENTS.filter(e=>e.day===TODAY_DAY).length}</div>
          <div className="kpi-s" style={{color:"var(--muted2)"}}>Quarta, 12 Mar</div>
        </div>
        <div className="kpi">
          <div className="kpi-l">Alto Impacto</div>
          <div className="kpi-v" style={{color:"var(--red)",fontSize:22}}>{CAL_EVENTS.filter(e=>e.day===TODAY_DAY&&e.impact==="high").length}</div>
          <div className="kpi-s dn">🔴 Esta semana: {CAL_EVENTS.filter(e=>e.impact==="high").length}</div>
        </div>
        <div className="kpi">
          <div className="kpi-l">Próximo evento</div>
          <div className="kpi-v" style={{color:"var(--blue)",fontSize:16,fontFamily:"var(--mono)"}}>03:30 UTC</div>
          <div className="kpi-s" style={{color:"var(--muted2)"}}>JPY GDP q/q</div>
        </div>
        <div className="kpi">
          <div className="kpi-l">NFP esta semana</div>
          <div className="kpi-v" style={{color:"var(--gold)",fontSize:16,fontFamily:"var(--mono)"}}>Sex 13:30</div>
          <div className="kpi-s" style={{color:"var(--red)"}}>🔴 Alto impacto</div>
        </div>
      </div>

      {/* DAY TABS */}
      <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
        {days.map(d=>(
          <button key={d.k} className={`day-btn${day===d.k?" on":""}`} onClick={()=>setDay(d.k)}>
            <span style={{fontWeight:700}}>{d.l}</span>
            <span style={{fontSize:10,color:"var(--muted)",marginLeft:5}}>{d.d}</span>
            {d.k===TODAY_DAY&&<span style={{marginLeft:5,fontSize:9,color:"var(--g)",fontWeight:700}}>HOJE</span>}
          </button>
        ))}
      </div>

      {/* FILTERS ROW */}
      <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:14,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:9,color:"var(--muted)",marginBottom:5,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Moeda</div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {allCurs.map(c=>{
              const m=CURRENCIES_META[c]||{flag:"🏳️",color:"var(--muted2)",bg:"var(--s3)"};
              return(
                <button key={c} className={`cur-btn${currencies.includes(c)?" on":""}`}
                  style={currencies.includes(c)?{borderColor:m.color,color:m.color,background:m.bg}:{}}
                  onClick={()=>toggleCur(c)}>
                  {m.flag} {c}
                </button>
              );
            })}
            {currencies.length>0&&<button className="cur-btn" style={{color:"var(--red)"}} onClick={()=>setCurrencies([])}>✕ Limpar</button>}
          </div>
        </div>
        <div>
          <div style={{fontSize:9,color:"var(--muted)",marginBottom:5,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>Impacto</div>
          <div style={{display:"flex",gap:5}}>
            {[["todos","Todos"],["high","🔴 Alto"],["medium","🟠 Médio"],["low","🟢 Baixo"]].map(([k,l])=>(
              <button key={k} className={`day-btn${impact===k?" on":""}`} style={{fontSize:11}} onClick={()=>setImpact(k)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",gap:10,background:"var(--s1)",flexWrap:"wrap"}}>
          <span style={{fontWeight:700,fontSize:13}}>
            {days.find(d=>d.k===day)?.l} · {days.find(d=>d.k===day)?.d}
          </span>
          <span className="tag tg" style={{fontSize:10}}>{events.length} eventos</span>
          {highCount>0&&<span className="tag tr" style={{fontSize:10}}>🔴 {highCount} alto impacto</span>}
          {medCount>0&&<span className="tag tgold" style={{fontSize:10}}>🟠 {medCount} médio impacto</span>}
          <span style={{marginLeft:"auto",fontSize:10,color:"var(--muted)"}}>Todos os horários em UTC · Clica num evento para detalhes</span>
        </div>
        <div className="cal-wrap">
          {events.length===0?(
            <div style={{padding:"48px 24px",textAlign:"center",color:"var(--muted2)"}}>
              <div style={{fontSize:32,marginBottom:10}}>📭</div>
              <div style={{fontWeight:700,marginBottom:5}}>Sem eventos para este filtro</div>
              <div style={{fontSize:12}}>Tenta remover os filtros de moeda ou impacto.</div>
            </div>
          ):(
            <table className="cal-table">
              <thead>
                <tr>
                  <th style={{width:70}}>Hora</th>
                  <th style={{width:90}}>Moeda</th>
                  <th>Evento</th>
                  <th style={{width:110}}>Impacto</th>
                  <th style={{width:80,textAlign:"right"}}>Previsão</th>
                  <th style={{width:80,textAlign:"right"}}>Anterior</th>
                  <th style={{width:80,textAlign:"right"}}>Real</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e,i)=>{
                  const cm=CURRENCIES_META[e.currency]||{flag:"🏳️",color:"var(--muted2)",bg:"var(--s3)"};
                  const isExp=expanded===e.id;
                  return(
                    <>
                      <tr key={e.id} className={impRow[e.impact]} style={{cursor:"pointer"}} onClick={()=>setExpanded(isExp?null:e.id)}>
                        <td><span className="cal-time">{e.time}</span></td>
                        <td>
                          <span className="cur-chip" style={{background:cm.bg,color:cm.color}}>
                            {cm.flag} {e.currency}
                          </span>
                        </td>
                        <td>
                          <div className="cal-name">{e.event}</div>
                        </td>
                        <td>
                          <span className={`imp ${impClass[e.impact]}`}>{impLabel[e.impact]}</span>
                        </td>
                        <td className="cal-val" style={{color:"var(--muted2)"}}>{e.forecast}</td>
                        <td className="cal-val" style={{color:"var(--muted)"}}>{e.previous}</td>
                        <td className="cal-val">
                          {e.actual
                            ? <span style={{color:parseFloat(e.actual)>parseFloat(e.forecast)?"#00e676":"var(--red)",fontWeight:700}}>{e.actual}</span>
                            : <span style={{color:"var(--muted)",fontSize:11}}>—</span>
                          }
                        </td>
                      </tr>
                      {isExp&&(
                        <tr key={e.id+"_exp"}>
                          <td colSpan={7} style={{padding:"10px 16px 14px 28px",background:"rgba(56,189,248,.03)",borderBottom:"1px solid var(--bd)"}}>
                            <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
                              <div style={{flex:2,minWidth:200}}>
                                <div style={{fontSize:11,color:"var(--blue)",fontWeight:700,marginBottom:4,letterSpacing:1,textTransform:"uppercase"}}>Sobre este indicador</div>
                                <div style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6}}>{e.desc}</div>
                              </div>
                              <div style={{flex:1,minWidth:160}}>
                                <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,marginBottom:8,letterSpacing:1,textTransform:"uppercase"}}>Como afecta o mercado</div>
                                <div style={{display:"flex",flexDirection:"column",gap:5,fontSize:11,color:"var(--muted2)"}}>
                                  {e.currency==="USD"&&<><span>• USD fortalece se acima da previsão</span><span>• Impacto direto no EUR/USD, GBP/USD, ouro</span></>}
                                  {e.currency==="EUR"&&<><span>• EUR fortalece se acima da previsão</span><span>• Impacto direto no EUR/USD, EUR/GBP</span></>}
                                  {e.currency==="GBP"&&<><span>• GBP fortalece se acima da previsão</span><span>• Impacto direto no GBP/USD, EUR/GBP</span></>}
                                  {!["USD","EUR","GBP"].includes(e.currency)&&<span>• {e.currency} reage directamente ao resultado vs previsão</span>}
                                </div>
                              </div>
                              <div style={{display:"flex",gap:8,flexShrink:0}}>
                                <button className="btn btn-ghost" style={{fontSize:10}}>🔔 Criar alerta</button>
                                <button className="btn btn-outline" style={{fontSize:10}}>📊 Ver gráfico</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div style={{padding:"10px 16px",borderTop:"1px solid var(--bd)",background:"var(--s1)",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:14,fontSize:11,color:"var(--muted)"}}>
            <span className="imp imp-high">🔴 Alto</span>
            <span className="imp imp-med">🟠 Médio</span>
            <span className="imp imp-low">🟢 Baixo</span>
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:8}}>
            <button className="btn btn-ghost" style={{fontSize:10}}>📥 Exportar CSV</button>
            <button className="btn btn-outline" style={{fontSize:10}}>🔔 Alertas de alta impacto</button>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{marginTop:14,padding:"10px 14px",background:"var(--s1)",border:"1px solid var(--bd)",borderRadius:8,fontSize:11,color:"var(--muted)",lineHeight:1.6}}>
        ⚠️ <strong>Aviso de risco:</strong> Eventos de alto impacto causam alta volatilidade. Recomendamos evitar abrir posições 15 minutos antes e depois de eventos marcados como 🔴 Alto. Dados indicativos — consulta sempre fontes oficiais como <em>forexfactory.com</em> ou <em>investing.com</em>.
      </div>
    </div>
  );
}

const NAV=[
  {sec:"TRADING",items:[{id:"signals",ic:"📡",l:"Sinais do Indicador",bd:"LIVE"},{id:"backtest",ic:"🔬",l:"Backtesting",bd:null},{id:"calendar",ic:"📅",l:"Calendário Económico",bd:"HOT"}]},
  {sec:"SOCIAL",items:[{id:"feed",ic:"🌐",l:"Feed Social",bd:"4"},{id:"leaderboard",ic:"🏆",l:"Leaderboard",bd:null},{id:"profile",ic:"👤",l:"Meu Perfil",bd:null}]},
  {sec:"COMPETIÇÕES",items:[{id:"competitions",ic:"🎮",l:"Campeonatos",bd:"HOT"},{id:"battles",ic:"⚔️",l:"1v1 Battles",bd:null},{id:"league",ic:"🏅",l:"Trading League",bd:null}]},
  {sec:"APRENDER",items:[{id:"strategies",ic:"📚",l:"Estratégias",bd:"10"},{id:"courses",ic:"🎓",l:"Academia",bd:null},{id:"mentors",ic:"🌟",l:"Mentores",bd:null}]},
  {sec:"MERCADO",items:[{id:"marketplace",ic:"🛒",l:"Marketplace",bd:"NOVO"},{id:"propfirms",ic:"🏦",l:"Prop Firms",bd:null}]},
  {sec:"COMUNIDADE",items:[{id:"chat",ic:"💬",l:"Chat",bd:"5"},{id:"mt5",ic:"🔌",l:"Conectar MT5",bd:null}]},
  {sec:"CONTA",items:[{id:"billing",ic:"💳",l:"Plano & Pagamento",bd:null}]},
];

/* ── PROFILE PAGE ──────────────────────────── */
function ProfilePage(){
  const p=MY_PROFILE;
  const lvl=LEVELS.find(l=>l.id===p.level.toLowerCase())||LEVELS[2];
  const xpPct=Math.round((p.levelXp-lvl.xp)/(p.levelNext-lvl.xp)*100);
  const lg=LEAGUES.find(l=>l.id===p.league)||LEAGUES[2];
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">👤 Meu Perfil</div><div className="ph-s">O teu perfil público como trader</div></div>
      <div className="profile-cover">
        <div style={{position:"absolute",top:12,right:16,display:"flex",gap:8}}>
          <span className="tag" style={{background:lg.bg,color:lg.color,border:`1px solid ${lg.color}44`}}>{lg.icon} {lg.name}</span>
          <span className="tag" style={{background:"rgba(0,230,118,.1)",color:"#00e676"}}>#{p.rank} Global</span>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile-av-wrap" style={{position:"relative",marginBottom:32}}>
          <div className="profile-av">{p.av}</div>
        </div>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:12}}>
          <div>
            <div className="profile-name">{p.flag} {p.name} {p.verified&&<span style={{color:"var(--blue)",fontSize:16}}>✓</span>}</div>
            <div style={{fontSize:12,color:"var(--muted2)"}}>{p.country} · {p.followers} seguidores · {p.following} seguindo</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-outline" style={{fontSize:11}}>✏️ Editar Perfil</button>
            <button className="btn btn-g" style={{fontSize:11}}>📤 Partilhar</button>
          </div>
        </div>
        <div className="profile-badges">
          {p.badges.map((b,i)=><span key={i} className="p-badge" style={{background:"var(--s3)",border:"1px solid var(--bd)",color:"var(--muted2)"}}>{b}</span>)}
        </div>
        <div className="profile-stats">
          {[["Win Rate",p.wr,"#00e676"],["Lucro Total",p.profit,"#00e676"],["Trades",p.trades,"var(--txt)"],["R:R Médio",p.rr,"var(--blue)"],["Drawdown",p.drawdown,"var(--red)"],["Pontos",p.pts.toLocaleString(),"var(--gold)"]].map(([l,v,c],i)=>(
            <div key={i} className="ps-item">
              <div className="ps-val" style={{color:c}}>{v}</div>
              <div className="ps-lbl">{l}</div>
            </div>
          ))}
        </div>
        <div className="level-bar-wrap">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:20}}>{lvl.icon}</span>
              <div><div style={{fontWeight:800,fontSize:14}}>{lvl.name}</div><div style={{fontSize:11,color:"var(--muted)"}}>Nível actual</div></div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"var(--mono)",fontSize:13,color:lvl.color}}>{p.levelXp.toLocaleString()} / {p.levelNext.toLocaleString()} XP</div>
              <div style={{fontSize:11,color:"var(--muted)"}}>{xpPct}% para o próximo nível</div>
            </div>
          </div>
          <div className="level-bar"><div className="level-fill" style={{width:xpPct+"%"}}/></div>
        </div>
      </div>
    </div>
  );
}

/* ── LEADERBOARD PAGE ───────────────────────── */
function LeaderboardPage(){
  const [tab,setTab]=useState("global");
  const [period,setPeriod]=useState("mensal");
  const mzTraders=LEADERBOARD.filter(t=>t.country==="Moçambique");
  const king=LEADERBOARD[0];
  const shown=tab==="mz"?mzTraders:LEADERBOARD;
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🏆 Leaderboard</div><div className="ph-s">Ranking global de traders · Semanal · Mensal · Anual</div></div>
      <div className="king-card">
        <div className="king-crown">👑</div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,fontWeight:700,color:"var(--gold)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>KING OF THE WEEK</div>
          <div style={{fontSize:20,fontWeight:900,marginBottom:4}}>{king.flag} {king.name}</div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <span className="tag tg">WR: {king.wr}</span>
            <span className="tag tgold">Lucro: {king.profit}</span>
            <span className="tag" style={{background:"rgba(192,132,252,.1)",color:"var(--purple)"}}>👑 {king.pts.toLocaleString()} pts</span>
          </div>
        </div>
        <button className="btn btn-outline" style={{flexShrink:0}}>⚔️ Desafiar</button>
      </div>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <div className="tabs-bar" style={{marginBottom:0}}>
          {[["global","🌍 Global"],["mz","🇲🇿 Moçambique"]].map(([k,l])=>(
            <button key={k} className={`tb${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        <div className="tabs-bar" style={{marginBottom:0}}>
          {[["semanal","Semana"],["mensal","Mês"],["anual","Ano"]].map(([k,l])=>(
            <button key={k} className={`tb${period===k?" on":""}`} onClick={()=>setPeriod(k)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="lb-table">
          <thead><tr>
            <th>#</th><th>Trader</th><th>País</th><th>Win Rate</th><th>Lucro</th><th>R:R</th><th>Trades</th><th>Liga</th><th></th>
          </tr></thead>
          <tbody>{shown.map((t,i)=>{
            const lg=LEAGUES.find(l=>l.id===t.league)||LEAGUES[0];
            return(
              <tr key={i}>
                <td><span className="lb-rank" style={{color:t.rank===1?"#ffd700":t.rank===2?"#c0c0c0":t.rank===3?"#cd7f32":"var(--muted2)"}}>
                  {t.rank===1?"🥇":t.rank===2?"🥈":t.rank===3?"🥉":"#"+t.rank}
                </span></td>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div className="lb-av" style={{background:t.bg,color:t.c}}>{t.av}</div>
                  <div><div style={{fontWeight:700,fontSize:13}}>{t.name} {t.verified&&<span style={{color:"var(--blue)",fontSize:10}}>✓</span>}</div>
                  <div style={{fontSize:10,color:"var(--muted)"}}>{t.followers} seguidores</div></div>
                </div></td>
                <td><span className="lb-country">{t.flag}</span></td>
                <td><span style={{color:"#00e676",fontWeight:700,fontFamily:"var(--mono)"}}>{t.wr}</span></td>
                <td><span style={{color:"#00e676",fontWeight:700,fontFamily:"var(--mono)"}}>{t.profit}</span></td>
                <td><span style={{fontFamily:"var(--mono)",color:"var(--blue)"}}>{t.rr}</span></td>
                <td><span style={{fontFamily:"var(--mono)",color:"var(--muted2)"}}>{t.trades}</span></td>
                <td><span className="tag" style={{background:lg.bg,color:lg.color,fontSize:9}}>{lg.icon} {lg.name}</span></td>
                <td><button className="btn btn-ghost" style={{fontSize:10,padding:"3px 9px"}}>Seguir</button></td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ── FEED SOCIAL PAGE ───────────────────────── */
function FeedPage(){
  const [posts,setPosts]=useState(FEED_POSTS);
  const [newPost,setNewPost]=useState("");
  const toggle=(id)=>setPosts(ps=>ps.map(p=>p.id===id?{...p,liked:!p.liked,likes:p.liked?p.likes-1:p.likes+1}:p));
  const submit=()=>{
    if(!newPost.trim())return;
    setPosts(ps=>[{id:Date.now(),av:"T",name:"Tu",c:"var(--g)",bg:"rgba(0,245,196,.15)",time:"agora",verified:MY_PROFILE.verified,league:"gold",content:newPost,trade:null,likes:0,comments:0,liked:false},...ps]);
    setNewPost("");
  };
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🌐 Feed Social</div><div className="ph-s">Partilha trades, análises e resultados com a comunidade</div></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:20,alignItems:"start"}}>
        <div>
          <div className="post-input">
            <div className="post-av" style={{background:"rgba(0,245,196,.15)",color:"var(--g)",width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,flexShrink:0}}>T</div>
            <div style={{flex:1}}>
              <textarea style={{width:"100%",background:"transparent",border:"none",color:"var(--txt)",fontFamily:"var(--font)",fontSize:14,resize:"none",outline:"none",minHeight:60}} placeholder="Partilha um trade, análise ou ideia..." value={newPost} onChange={e=>setNewPost(e.target.value)}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-ghost" style={{fontSize:11}}>📊 Trade</button>
                  <button className="btn btn-ghost" style={{fontSize:11}}>📈 Gráfico</button>
                </div>
                <button className="btn btn-g" style={{fontSize:11}} onClick={submit}>Publicar</button>
              </div>
            </div>
          </div>
          <div className="feed-grid">
            {posts.map((p,i)=>{
              const lg=LEAGUES.find(l=>l.id===p.league)||LEAGUES[0];
              return(
                <div key={p.id} className="post-card">
                  <div className="post-header">
                    <div className="post-av" style={{background:p.bg,color:p.c,width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800}}>{p.av}</div>
                    <div className="post-body">
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <span className="post-name">{p.name}</span>
                        {p.verified&&<span style={{color:"var(--blue)",fontSize:12}}>✓</span>}
                        <span className="tag" style={{background:lg.bg,color:lg.color,fontSize:9}}>{lg.icon}</span>
                      </div>
                      <div className="post-meta">{p.time}</div>
                    </div>
                    <button className="btn btn-ghost" style={{fontSize:10,padding:"3px 9px",flexShrink:0}}>Seguir</button>
                  </div>
                  <div className="post-content">{p.content}</div>
                  {p.trade&&(
                    <div className="post-trade-box">
                      <span style={{color:p.trade.type==="COMPRA"?"var(--g)":"var(--red)",fontWeight:800}}>{p.trade.sym} {p.trade.type}</span>
                      <span>Entrada: {p.trade.entry}</span>
                      <span style={{color:"#00e676"}}>TP: {p.trade.tp}</span>
                      <span style={{color:"var(--red)"}}>SL: {p.trade.sl}</span>
                      <span style={{color:"var(--gold)",fontWeight:700}}>{p.trade.result}</span>
                      <span style={{color:"#00e676"}}>{p.trade.pips} pips</span>
                    </div>
                  )}
                  <div className="post-actions">
                    <div className={`post-action${p.liked?" liked":""}`} onClick={()=>toggle(p.id)}>❤️ {p.likes}</div>
                    <div className="post-action">💬 {p.comments}</div>
                    <div className="post-action">🔗 Partilhar</div>
                    <div className="post-action">📊 Ver perfil</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="card" style={{marginBottom:14}}>
            <div className="card-h">🔥 Trending esta semana</div>
            {LEADERBOARD.slice(0,5).map((t,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div className="lb-av" style={{background:t.bg,color:t.c}}>{t.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:700}}>{t.flag} {t.name}</div>
                  <div style={{fontSize:10,color:"var(--g)"}}>{t.wr} acerto · {t.profit}</div>
                </div>
                <button className="btn btn-ghost" style={{fontSize:9,padding:"2px 7px"}}>+</button>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-h">📊 O teu resumo</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[["Win Rate",MY_PROFILE.wr,"#00e676"],["Lucro",MY_PROFILE.profit,"#00e676"],["Ranking","#"+MY_PROFILE.rank,"var(--gold)"]].map(([l,v,c],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:13}}>
                  <span style={{color:"var(--muted2)"}}>{l}</span>
                  <span style={{fontFamily:"var(--mono)",fontWeight:700,color:c}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PRIZE ENGINE UTILITIES ─────────────────────────────────── */
function calcPrize(totalArrecadado, margin, pct, maxPerWinner){
  const fundoPremios = totalArrecadado * (1 - margin);
  const raw = fundoPremios * pct;
  return Math.min(raw, maxPerWinner);
}
function calcAppRevenue(total, margin){ return total * margin; }
function calcTotalArrecadado(participants, entryUSD){ return participants * entryUSD; }

/* ── PRIZE ENGINE PANEL (standalone, reusable) ────────────────── */
function PrizeEnginePanel({comp, onClose}){
  const [parts, setParts]   = useState(comp.participants);
  const [margin, setMargin] = useState(comp.margin * 100);   // in %
  const [minPrize, setMinPrize] = useState(10);
  const [promoMode, setPromoMode] = useState(false);

  const effectiveMargin = promoMode ? Math.max(0, margin - 5) : margin;
  const total    = calcTotalArrecadado(parts, comp.entryUSD);
  const appRev   = calcAppRevenue(total, effectiveMargin / 100);
  const prizePool= total - appRev;
  const firstPlace = calcPrize(total, effectiveMargin/100, comp.prizeDistrib[0].pct, comp.maxPrizePerWinner);
  const blocked  = firstPlace < minPrize;

  const fmt = (v) => "$" + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,",");
  const pc  = (v) => v.toFixed(1) + "%";

  return(
    <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal" style={{maxWidth:580}}>
        <div className="modal-head">
          <div>
            <div className="modal-title">🧮 Motor de Cálculo de Prémio</div>
            <div className="modal-sub">{comp.emoji} {comp.title}</div>
          </div>
          <button className="close-x" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">

          {/* FORMULA BOX */}
          <div className="pe-formula">
            <div style={{marginBottom:4}}>
              <strong>PremioPorVencedor</strong> = min(
            </div>
            <div style={{paddingLeft:16}}>
              ValorMaximoPremio <span style={{color:"var(--muted)"}}>({fmt(comp.maxPrizePerWinner)})</span>,
            </div>
            <div style={{paddingLeft:16}}>
              (TotalArrecadado × (1 − Margem)) × PctPosição
            </div>
            <div>)</div>
            <div style={{marginTop:6,color:"var(--muted)",fontSize:11}}>
              ReceitaApp = TotalArrecadado × Margem
            </div>
          </div>

          {/* SLIDERS */}
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,marginBottom:10,letterSpacing:1,textTransform:"uppercase"}}>Ajustar variáveis</div>

            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:"var(--muted2)"}}>Nº de Participantes</span>
                <span className="pe-val" style={{color:"var(--blue)"}}>{parts}</span>
              </div>
              <input type="range" className="pe-slider" min={1} max={comp.maxParts} value={parts} onChange={e=>setParts(+e.target.value)} style={{width:"100%"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--muted)",marginTop:2}}>
                <span>1</span><span>{comp.maxParts} (máx)</span>
              </div>
            </div>

            <div style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:"var(--muted2)"}}>Margem do App</span>
                <span className="pe-val" style={{color:"var(--gold)"}}>{pc(effectiveMargin)}{promoMode?" 🎉":""}</span>
              </div>
              <input type="range" className="pe-slider" min={5} max={50} value={margin} onChange={e=>setMargin(+e.target.value)} style={{width:"100%"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"var(--muted)",marginTop:2}}>
                <span>5%</span><span>50%</span>
              </div>
            </div>

            <div style={{marginBottom:4}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:5}}>
                <span style={{color:"var(--muted2)"}}>Prémio Mínimo (bloqueio)</span>
                <span className="pe-val" style={{color:"var(--red)"}}>{fmt(minPrize)}</span>
              </div>
              <input type="range" className="pe-slider" min={1} max={100} value={minPrize} onChange={e=>setMinPrize(+e.target.value)} style={{width:"100%"}}/>
            </div>
          </div>

          {/* PROMO MODE */}
          <div style={{marginBottom:14}}>
            <div style={{fontSize:10,color:"var(--muted)",fontWeight:700,marginBottom:6,letterSpacing:1,textTransform:"uppercase"}}>Modo de promoção (ajuste dinâmico da margem)</div>
            <div className="promo-row">
              {[false,true].map(v=>(
                <button key={String(v)} className={`promo-btn${promoMode===v?" on":""}`} onClick={()=>setPromoMode(v)}>
                  {v?"🎉 Modo Promo (−5% margem)":"💼 Margem Normal"}
                </button>
              ))}
            </div>
          </div>

          {/* RESULTS */}
          <div className="pe-result-grid">
            <div className="pe-result-card" style={{background:"rgba(0,245,196,.07)",border:"1px solid rgba(0,245,196,.2)"}}>
              <div className="pe-label" style={{color:"var(--g)"}}>Total Arrecadado</div>
              <div className="pe-amount" style={{color:"var(--g)"}}>{fmt(total)}</div>
              <div className="pe-note" style={{color:"var(--g)"}}>{parts}×{fmt(comp.entryUSD)}</div>
            </div>
            <div className="pe-result-card" style={{background:"rgba(56,189,248,.07)",border:"1px solid rgba(56,189,248,.2)"}}>
              <div className="pe-label" style={{color:"var(--blue)"}}>Fundo de Prémios</div>
              <div className="pe-amount" style={{color:"var(--blue)"}}>{fmt(prizePool)}</div>
              <div className="pe-note" style={{color:"var(--blue)"}}>{pc(100 - effectiveMargin)} do total</div>
            </div>
            <div className="pe-result-card" style={{background:"rgba(255,184,48,.07)",border:"1px solid rgba(255,184,48,.2)"}}>
              <div className="pe-label" style={{color:"var(--gold)"}}>Receita do App</div>
              <div className="pe-amount" style={{color:"var(--gold)"}}>{fmt(appRev)}</div>
              <div className="pe-note" style={{color:"var(--gold)"}}>{pc(effectiveMargin)} de margem</div>
            </div>
          </div>

          {/* PRIZE TABLE */}
          <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,marginBottom:8,letterSpacing:1,textTransform:"uppercase"}}>Distribuição por posição</div>
          <table className="pe-prizes-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>% do Fundo</th>
                <th>Valor Calculado</th>
                <th>Teto Máximo</th>
                <th style={{textAlign:"right"}}>Prémio Final</th>
              </tr>
            </thead>
            <tbody>
              {comp.prizeDistrib.map((d,i)=>{
                const calculated = prizePool * d.pct;
                const final = Math.min(calculated, comp.maxPrizePerWinner);
                const cappedByMax = calculated > comp.maxPrizePerWinner;
                return(
                  <tr key={i}>
                    <td><span style={{fontWeight:800,color:i===0?"#ffd700":i===1?"#c0c0c0":i===2?"#cd7f32":"var(--muted2)"}}>{d.icon} {d.label}</span></td>
                    <td><span style={{fontFamily:"var(--mono)",color:"var(--muted2)"}}>{pc(d.pct*100)}</span></td>
                    <td><span style={{fontFamily:"var(--mono)",color:"var(--muted2)"}}>{fmt(calculated)}</span></td>
                    <td><span style={{fontFamily:"var(--mono)",color:"var(--muted)",fontSize:11}}>{fmt(comp.maxPrizePerWinner)}</span></td>
                    <td style={{textAlign:"right"}}>
                      <span style={{fontFamily:"var(--mono)",fontWeight:800,fontSize:15,color:"var(--gold)"}}>{fmt(final)}</span>
                      {cappedByMax&&<span style={{fontSize:9,color:"var(--red)",marginLeft:4}}>⚠ teto</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* BLOCK / OK STATUS */}
          <div style={{marginBottom:16}}>
            {blocked
              ? <div className="min-block">🚫 <span>Inscrições <strong>BLOQUEADAS</strong> — 1º lugar {fmt(firstPlace)} está abaixo do mínimo {fmt(minPrize)}. Precisa de mais {Math.ceil((minPrize/comp.prizeDistrib[0].pct - prizePool)/(1-effectiveMargin/100)/comp.entryUSD)} inscrições.</span></div>
              : <div className="ok-block">✅ <span>Inscrições <strong>ABERTAS</strong> — prémio do 1º lugar ({fmt(firstPlace)}) está acima do mínimo ({fmt(minPrize)}).</span></div>
            }
          </div>

          <button className={`btn ${blocked?"btn-ghost":"btn-g"}`} style={{width:"100%",fontSize:13}} disabled={blocked}>
            {blocked?"🚫 Bloqueado — Prémio abaixo do mínimo":`Entrar — ${fmt(comp.entryUSD)} · 1º lugar estimado: ${fmt(firstPlace)}`}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── COMPETITIONS PAGE ──────────────────────── */
function CompetitionsPage(){
  const [tab,setTab]=useState("open");
  const [engine,setEngine]=useState(null);  // comp being viewed in engine modal

  const fmt = (v) => "$" + v.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",");

  return(
    <div className="page">
      {engine&&<PrizeEnginePanel comp={engine} onClose={()=>setEngine(null)}/>}
      <div className="ph"><div className="ph-t">🎮 Campeonatos</div><div className="ph-s">Competes com traders de todo o mundo · Prémios calculados em tempo real · Transparência total</div></div>

      {/* ENGINE CTA */}
      <div style={{background:"linear-gradient(135deg,rgba(255,184,48,.07),rgba(255,215,0,.04))",border:"1px solid rgba(255,184,48,.25)",borderRadius:12,padding:"16px 20px",marginBottom:20,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div style={{fontSize:28}}>🧮</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,fontSize:14,marginBottom:3}}>Motor de Cálculo de Prémio — 100% transparente</div>
          <div style={{fontSize:12,color:"var(--muted2)"}}>Os prémios são calculados automaticamente com base no número de inscritos. A plataforma retém a margem definida. Clica em "Simulador" para ver a fórmula ao vivo.</div>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0}}>
          <button className="btn btn-gold" onClick={()=>setEngine(COMPETITIONS[0])}>🧮 Abrir Simulador</button>
        </div>
      </div>

      <div className="tabs-bar">
        {[["open","Abertos"],["active","A decorrer"],["finished","Concluídos"]].map(([k,l])=>(
          <button key={k} className={`tb${tab===k?" on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>
      <div className="comp-grid">
        {COMPETITIONS.map((c,i)=>{
          // live-compute everything
          const total    = c.participants * c.entryUSD;
          const prizePool= total * (1 - c.margin);
          const appRev   = total * c.margin;
          const firstPrize = Math.min(prizePool * c.prizeDistrib[0].pct, c.maxPrizePerWinner);

          return(
            <div key={i} className="comp-card">
              <div className="comp-banner" style={{background:c.bg,flexDirection:"column",gap:4}}>
                <span style={{fontSize:30}}>{c.emoji}</span>
                <span style={{fontSize:13,fontWeight:800,color:"var(--txt)",textAlign:"center",padding:"0 12px"}}>{c.title}</span>
              </div>
              <div className="comp-body">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:3}}>Pool estimado</div>
                    <div className="comp-pool">{fmt(prizePool)}</div>
                  </div>
                  <span className="tag tg">{c.status}</span>
                </div>

                {/* Live pool bar */}
                <div style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}>
                    <span style={{color:"var(--muted2)"}}>{c.participants} / {c.maxParts} inscritos</span>
                    <span style={{color:"var(--g)",fontWeight:700}}>{Math.round(c.participants/c.maxParts*100)}% cheio</span>
                  </div>
                  <div style={{background:"var(--s3)",borderRadius:6,height:7,overflow:"hidden"}}>
                    <div style={{height:7,background:`linear-gradient(90deg,${c.color},${c.color}99)`,borderRadius:6,width:`${c.participants/c.maxParts*100}%`,transition:"width .5s"}}/>
                  </div>
                </div>

                <div className="comp-meta" style={{marginBottom:12}}>
                  <span className="tag tgold">Entrada: {fmt(c.entryUSD)}</span>
                  <span className="tag tblue">⏱ {c.days} dias</span>
                  <span className="tag" style={{background:"rgba(255,184,48,.08)",color:"var(--gold)"}}>App: {(c.margin*100).toFixed(0)}%</span>
                </div>

                <div style={{fontSize:12,color:"var(--muted2)",marginBottom:12,lineHeight:1.5}}>{c.desc}</div>

                {/* Prize distribution — live calculated */}
                <div style={{background:"var(--s3)",borderRadius:9,padding:"12px 14px",marginBottom:12}}>
                  <div style={{fontSize:10,color:"var(--muted)",fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Prémios estimados</div>
                  <div className="prize-row">
                    {c.prizeDistrib.map((d,j)=>{
                      const val = Math.min(prizePool * d.pct, c.maxPrizePerWinner);
                      return(
                        <div key={j} className="prize-i">
                          <div className="prize-pos" style={{background:j===0?"rgba(255,215,0,.15)":j===1?"rgba(192,192,192,.15)":j===2?"rgba(205,127,50,.15)":"rgba(100,116,139,.1)",color:j===0?"#ffd700":j===1?"#c0c0c0":j===2?"#cd7f32":"var(--muted2)"}}>{d.icon}</div>
                          <span style={{flex:1,color:"var(--muted2)",fontSize:12}}>{d.label}</span>
                          <span style={{fontFamily:"var(--mono)",fontWeight:800,color:"var(--gold)"}}>{fmt(val)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{borderTop:"1px solid var(--bd)",marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between",fontSize:11}}>
                    <span style={{color:"var(--muted)"}}>Receita da plataforma</span>
                    <span style={{fontFamily:"var(--mono)",color:"var(--gold)",fontWeight:700}}>{fmt(appRev)}</span>
                  </div>
                </div>

                {/* Estimated 1st place callout */}
                <div style={{background:"rgba(0,245,196,.05)",border:"1px solid rgba(0,245,196,.2)",borderRadius:7,padding:"8px 12px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>🥇</span>
                  <div style={{flex:1,fontSize:11,color:"var(--muted2)"}}>1º lugar estimado com {c.participants} inscritos:</div>
                  <span style={{fontFamily:"var(--mono)",fontSize:16,fontWeight:800,color:"var(--g)"}}>{fmt(firstPrize)}</span>
                </div>

                <div style={{display:"flex",gap:8}}>
                  <button className="btn btn-outline" style={{fontSize:11,flex:1}} onClick={()=>setEngine(c)}>🧮 Simulador</button>
                  <button className="btn btn-g" style={{fontSize:11,flex:2}}>Entrar — {fmt(c.entryUSD)}</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── TRADING LEAGUE PAGE ────────────────────── */
function LeaguePage(){
  const [active,setActive]=useState("gold");
  const myLg=LEAGUES.find(l=>l.id===MY_PROFILE.league)||LEAGUES[2];
  const lg=LEAGUES.find(l=>l.id===active)||LEAGUES[2];
  const lgTraders=LEADERBOARD.filter(t=>t.league===active);
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🏅 Trading League</div><div className="ph-s">Sobe de divisão baseado na tua performance · Bronze → Silver → Gold → Diamond → Legend</div></div>
      <div className="card" style={{marginBottom:20,background:`${myLg.bg}`,border:`1px solid ${myLg.color}44`}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{fontSize:40}}>{myLg.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:"var(--muted)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>A TUA DIVISÃO ACTUAL</div>
            <div style={{fontSize:22,fontWeight:900,color:myLg.color,marginBottom:4}}>{myLg.name} League</div>
            <div style={{fontSize:12,color:"var(--muted2)"}}>Pontos: <strong style={{color:"var(--gold)",fontFamily:"var(--mono)"}}>{MY_PROFILE.pts.toLocaleString()}</strong> · Ranking: <strong style={{color:"var(--g)"}}>#{MY_PROFILE.rank} global</strong></div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>Próxima divisão</div>
            <div style={{fontSize:18,fontWeight:800}}>💎 Diamond</div>
            <div style={{fontSize:11,color:"var(--muted)"}}>+800 pts necessários</div>
          </div>
        </div>
      </div>
      <div className="league-grid">
        {LEAGUES.map(l=>(
          <div key={l.id} className={`league-card${active===l.id?" active":""}`} style={{background:active===l.id?l.bg:"var(--s2)",borderColor:active===l.id?l.color+"66":"var(--bd)"}} onClick={()=>setActive(l.id)}>
            <div className="league-icon">{l.icon}</div>
            <div className="league-name" style={{color:active===l.id?l.color:"var(--txt)"}}>{l.name}</div>
            <div className="league-pts">{l.pts} pts</div>
          </div>
        ))}
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 16px",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>{lg.icon}</span>
          <span style={{fontWeight:700}}>{lg.name} League — Top Traders</span>
          <span className="tag" style={{background:lg.bg,color:lg.color,marginLeft:"auto"}}>{lg.pts} pts</span>
        </div>
        {lgTraders.length>0?(
          <table className="lb-table">
            <thead><tr><th>#</th><th>Trader</th><th>Win Rate</th><th>Lucro</th><th>Pontos</th><th></th></tr></thead>
            <tbody>{lgTraders.map((t,i)=>(
              <tr key={i}>
                <td><span className="lb-rank">#{t.rank}</span></td>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div className="lb-av" style={{background:t.bg,color:t.c}}>{t.av}</div>
                  <span style={{fontWeight:700,fontSize:13}}>{t.flag} {t.name}</span>
                </div></td>
                <td><span style={{color:"#00e676",fontFamily:"var(--mono)",fontWeight:700}}>{t.wr}</span></td>
                <td><span style={{color:"#00e676",fontFamily:"var(--mono)",fontWeight:700}}>{t.profit}</span></td>
                <td><span style={{color:"var(--gold)",fontFamily:"var(--mono)",fontWeight:700}}>{t.pts.toLocaleString()}</span></td>
                <td><button className="btn btn-ghost" style={{fontSize:10,padding:"3px 8px"}}>⚔️ Desafiar</button></td>
              </tr>
            ))}</tbody>
          </table>
        ):(
          <div style={{padding:32,textAlign:"center",color:"var(--muted2)"}}>Nenhum trader nesta liga ainda.</div>
        )}
      </div>
    </div>
  );
}

/* ── 1V1 BATTLES PAGE ───────────────────────── */
function BattlesPage(){
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">⚔️ Trader vs Trader</div><div className="ph-s">Desafios 1v1 entre traders · Critérios: lucro, drawdown e risco · Duração: 7 dias</div></div>
      <div className="card" style={{marginBottom:20,background:"rgba(255,61,107,.04)",border:"1px solid rgba(255,61,107,.2)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
          <div style={{fontSize:28}}>⚔️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:15,marginBottom:3}}>Cria um novo desafio</div>
            <div style={{fontSize:12,color:"var(--muted2)"}}>Desafia qualquer trader do ranking. Define o prazo, critérios e apostas.</div>
          </div>
          <button className="btn btn-g">Desafiar Trader</button>
        </div>
      </div>
      <div className="card-h" style={{marginBottom:12,fontSize:14,fontWeight:700}}>⚔️ Batalhas a decorrer</div>
      {BATTLES.map((b,i)=>(
        <div key={i} className="battle-card">
          <div className="battle-vs">
            <div className="battle-trader">
              <div style={{width:48,height:48,borderRadius:"50%",background:b.traderA.bg,color:b.traderA.c,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,margin:"0 auto 6px"}}>{b.traderA.av}</div>
              <div style={{fontWeight:800,fontSize:14}}>{b.traderA.name}</div>
              <div style={{fontFamily:"var(--mono)",color:"#00e676",fontWeight:700,fontSize:16,marginTop:4}}>{b.traderA.profit}</div>
            </div>
            <div style={{textAlign:"center"}}>
              <div className="battle-vs-badge">VS</div>
              <div style={{fontSize:10,color:"var(--muted)",marginTop:8}}>{b.days}/{b.totalDays} dias</div>
              <span className="tag tg" style={{marginTop:4,display:"inline-block"}}>{b.status}</span>
            </div>
            <div className="battle-trader">
              <div style={{width:48,height:48,borderRadius:"50%",background:b.traderB.bg,color:b.traderB.c,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:20,margin:"0 auto 6px"}}>{b.traderB.av}</div>
              <div style={{fontWeight:800,fontSize:14}}>{b.traderB.name}</div>
              <div style={{fontFamily:"var(--mono)",color:"#00e676",fontWeight:700,fontSize:16,marginTop:4}}>{b.traderB.profit}</div>
            </div>
          </div>
          <div style={{marginTop:4,display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--muted)"}}>
            <span>{b.pctA}%</span><span>{b.pctB}%</span>
          </div>
          <div className="battle-bar">
            <div className="battle-fill-a" style={{width:b.pctA+"%"}}/>
            <div className="battle-fill-b" style={{width:b.pctB+"%"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── MARKETPLACE PAGE ───────────────────────── */
function MarketplacePage(){
  const [filter,setFilter]=useState("todos");
  const types=["todos","ROBÔ MT5","INDICADOR","ESTRATÉGIA","CURSO","FERRAMENTA"];
  const shown=filter==="todos"?MARKETPLACE_ITEMS:MARKETPLACE_ITEMS.filter(i=>i.type===filter);
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🛒 Marketplace</div><div className="ph-s">Compra e vende indicadores, robôs, estratégias e cursos · 15% comissão da plataforma</div></div>
      <div style={{background:"rgba(0,245,196,.04)",border:"1px solid rgba(0,245,196,.15)",borderRadius:10,padding:"12px 16px",marginBottom:18,display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{fontSize:22}}>💡</div>
        <div style={{flex:1,fontSize:12,color:"var(--muted2)"}}>És mentor ou desenvolvedor? <strong style={{color:"var(--g)"}}>Vende os teus produtos aqui</strong> — a plataforma retém 15% de comissão. Aceita M-Pesa, e-Mola e USDT.</div>
        <button className="btn btn-g" style={{flexShrink:0}}>+ Publicar produto</button>
      </div>
      <div className="tabs-bar">
        {types.map(t=><button key={t} className={`tb${filter===t?" on":""}`} onClick={()=>setFilter(t)}>{t==="todos"?"Todos":t}</button>)}
      </div>
      <div className="mkt-grid">
        {shown.map((item,i)=>(
          <div key={i} className="mkt-card">
            <div className="mkt-banner" style={{background:item.bg}}>{item.emoji}</div>
            <div className="mkt-body">
              <div className="mkt-type" style={{color:item.color}}>{item.type}</div>
              <div className="mkt-title">{item.title}</div>
              <div style={{fontSize:11,color:"var(--muted)",marginBottom:8}}>por {item.author} · ⭐{item.rating} · {item.sales} vendas</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className="mkt-price" style={{color:item.price==="FREE"?"#00e676":"var(--gold)"}}>{item.price}</div>
                <button className="btn btn-g" style={{fontSize:11}}>{item.price==="FREE"?"Download":"Comprar"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MT5 CONNECT PAGE ───────────────────────── */
function MT5Page(){
  const [step,setStep]=useState(0);
  const [acc,setAcc]=useState("");
  const [connected,setConnected]=useState(false);
  const connect=()=>{if(acc){setConnected(true);setStep(3);}};
  return(
    <div className="page">
      <div className="ph"><div className="ph-t">🔌 Conectar MetaTrader 5</div><div className="ph-s">Liga a tua conta MT5 ao Traders Arena via Expert Advisor Bridge</div></div>
      <div className="mt5-flow">
        {[["MT5","A tua plataforma"],["EA Bridge","Expert Advisor"],["API Servidor","Traders Arena Server"],["Traders Arena","Perfil verificado"]].map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center"}}>
            <div className="mt5-step" style={{borderColor:i<=step?"var(--g)":"var(--bd)",background:i<step?"rgba(0,245,196,.06)":"var(--s3)"}}>
              <div style={{fontSize:18,marginBottom:4}}>{"📱📦🖥️✅".split("")[i] || "?"}</div>
              <div style={{fontSize:11,fontWeight:700,color:i<=step?"var(--g)":"var(--muted2)"}}>{s[0]}</div>
              <div style={{fontSize:9,color:"var(--muted)",marginTop:2}}>{s[1]}</div>
            </div>
            {i<3&&<div className="mt5-arrow">→</div>}
          </div>
        ))}
      </div>
      {connected?(
        <div>
          <div style={{background:"rgba(0,245,196,.06)",border:"1px solid rgba(0,245,196,.25)",borderRadius:12,padding:"20px 22px",marginBottom:20}}>
            <div style={{display:"flex",gap:14,alignItems:"center"}}>
              <div style={{fontSize:32}}>✅</div>
              <div>
                <div style={{fontWeight:800,fontSize:16,color:"var(--g)",marginBottom:3}}>MT5 Conectado com sucesso!</div>
                <div style={{fontSize:12,color:"var(--muted2)"}}>Conta: #{acc} · Os teus trades são agora verificados e contribuem para o teu ranking.</div>
              </div>
            </div>
          </div>
          <div className="kpi-row">
            {[["Trades verificados","0","var(--g)"],["Lucro sincronizado","$0.00","#00e676"],["Estado","Ao vivo","var(--g)"],["Última sincronização","agora","var(--blue)"]].map(([l,v,c],i)=>(
              <div key={i} className="kpi"><div className="kpi-l">{l}</div><div className="kpi-v" style={{color:c,fontSize:18,fontFamily:"var(--mono)"}}>{v}</div></div>
            ))}
          </div>
        </div>
      ):(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          <div className="card">
            <div className="card-h">📥 Passo 1 — Instalar o EA Bridge</div>
            <div style={{fontSize:13,color:"var(--muted2)",marginBottom:16,lineHeight:1.7}}>
              Descarrega o Expert Advisor Traders Arena Bridge e instala na pasta <code style={{fontFamily:"var(--mono)",background:"var(--s3)",padding:"2px 6px",borderRadius:4,fontSize:11}}>/MQL5/Experts/</code> do teu MT5.
            </div>
            <button className="btn btn-g" style={{width:"100%",marginBottom:10}}>📥 Download EA Bridge (.ex5)</button>
            <div style={{fontSize:11,color:"var(--muted)"}}>Compatível com MT5 build 3000+. Windows e Mac.</div>
          </div>
          <div className="card">
            <div className="card-h">🔗 Passo 2 — Conectar conta</div>
            <label className="f-label">NÚMERO DA CONTA MT5</label>
            <input className="f-input" placeholder="Ex: 123456789" value={acc} onChange={e=>setAcc(e.target.value)}/>
            <label className="f-label">TOKEN DE SEGURANÇA (gerado pelo EA)</label>
            <input className="f-input" placeholder="TA-XXXX-XXXX-XXXX"/>
            <button className="btn btn-g" style={{width:"100%"}} onClick={connect}>Conectar MT5</button>
          </div>
          <div className="card" style={{gridColumn:"1/-1",background:"rgba(56,189,248,.04)",border:"1px solid rgba(56,189,248,.15)"}}>
            <div className="card-h" style={{color:"var(--blue)"}}>ℹ️ Como funciona a verificação</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
              {["O EA Bridge lê os teus trades em tempo real do MT5","Envia os dados encriptados para o servidor Traders Arena","Os teus trades ficam marcados como ✓ Verificado no perfil","O teu win rate e lucro são actualizados automaticamente no ranking"].map((t,i)=>(
                <div key={i} style={{display:"flex",gap:10,fontSize:12,color:"var(--muted2)"}}>
                  <span style={{color:"var(--blue)",flexShrink:0}}>{"①②③④"[i]}</span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [view,setView]=useState("landing");
  const [page,setPage]=useState("signals");
  const [payPlan,setPayPlan]=useState(null);
  const [sbOpen,setSbOpen]=useState(false);

  const titles={signals:"Sinais do Indicador",backtest:"Backtesting",chat:"Comunidade",courses:"Academia",mentors:"Mentores",propfirms:"Prop Firms",billing:"Plano & Pagamento",strategies:"Manuais de Estratégias",feed:"Feed Social",leaderboard:"Leaderboard Global",profile:"Meu Perfil",competitions:"Campeonatos",battles:"1v1 Battles",league:"Trading League",marketplace:"Marketplace",mt5:"Conectar MT5",calendar:"Calendário Económico"};

  if(view==="landing") return(
    <>
      <style>{css}</style>
      {payPlan&&<PayModal plan={payPlan} onClose={()=>setPayPlan(null)}/>}
      <Landing onEnter={()=>setView("app")} onPay={p=>setPayPlan(p)}/>
    </>
  );

  return(
    <div>
      <style>{css}</style>
      {payPlan&&<PayModal plan={payPlan} onClose={()=>setPayPlan(null)}/>}
      <div className="shell">
        <aside className={`sb${sbOpen?" open":""}`}>
          <div className="sb-logo">
            <div className="sb-mark">⚔️</div>
            <div className="sb-name">Traders <span>Arena</span></div>
          </div>
          <nav className="sb-nav">
            {NAV.map((s,i)=>(
              <div key={i}>
                <div className="sb-sec">{s.sec}</div>
                {s.items.map((item,j)=>(
                  <div key={j} className={`sb-i${page===item.id?" on":""}`} onClick={()=>{setPage(item.id);setSbOpen(false);}}>
                    <span className="sb-ic">{item.ic}</span>
                    <span>{item.l}</span>
                    {item.bd&&<span className={`sb-bd${item.bd==="LIVE"||item.bd==="10"?" sb-bdg":""}`}>{item.bd}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div className="sb-bot">
            <div className="u-pill">
              <div className="u-av">T</div>
              <div><div style={{fontSize:12,fontWeight:600}}>Trader</div><div style={{fontSize:10,color:"var(--g)"}}>Indicador Pro</div></div>
            </div>
          </div>
        </aside>
        <div className="main">
          <div className="topbar">
            <button className="menu-btn" onClick={()=>setSbOpen(o=>!o)}>☰</button>
            <div className="tb-title">{titles[page]||page}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-ghost" style={{fontSize:11}} onClick={()=>setView("landing")}>← Landing</button>
              <button className="btn btn-g" style={{fontSize:11}} onClick={()=>setPayPlan(PLANS[1])}>Upgrade Pro</button>
            </div>
          </div>
          <main>
            {page==="signals"&&<SignalsPage/>}
            {page==="backtest"&&<BacktestPage/>}
            {page==="calendar"&&<EconCalendar/>}
            {page==="strategies"&&<StrategiesPage/>}
            {page==="courses"&&<CoursesPage onBuy={c=>setPayPlan({name:c.t,pm:c.p})}/>}
            {page==="mentors"&&<MentorsPage/>}
            {page==="chat"&&<ChatPage/>}
            {page==="propfirms"&&<PropFirmsPage/>}
            {page==="feed"&&<FeedPage/>}
            {page==="leaderboard"&&<LeaderboardPage/>}
            {page==="profile"&&<ProfilePage/>}
            {page==="competitions"&&<CompetitionsPage/>}
            {page==="battles"&&<BattlesPage/>}
            {page==="league"&&<LeaguePage/>}
            {page==="marketplace"&&<MarketplacePage/>}
            {page==="mt5"&&<MT5Page/>}
            {page==="billing"&&(
              <div className="page">
                <div className="ph"><div className="ph-t">💳 Plano & Pagamento</div><div className="ph-s">Gere a tua subscrição</div></div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14}}>
                  {PLANS.map((p,i)=>(
                    <div key={i} className={`plan-card${p.hot?" hot":""} card`} style={{borderRadius:14,padding:"24px 20px",position:"relative"}}>
                      {p.hot&&<div className="plan-hot">⭐ MAIS POPULAR</div>}
                      <div style={{fontSize:28,marginBottom:10}}>{p.ico}</div>
                      <div style={{fontSize:18,fontWeight:800,marginBottom:4}}>{p.name}</div>
                      <div style={{fontFamily:"var(--mono)",fontSize:26,fontWeight:700,color:"var(--g)",marginBottom:4}}>{p.pm}</div>
                      <div style={{fontSize:11,color:"var(--muted)",marginBottom:16}}>{p.usd}/mês</div>
                      <ul className="plan-feats" style={{marginBottom:16}}>{p.feats.map((f,j)=><li key={j}>{f}</li>)}</ul>
                      <button className={`btn ${p.hot?"btn-g":"btn-outline"}`} style={{width:"100%"}} onClick={()=>setPayPlan(p)}>Assinar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
