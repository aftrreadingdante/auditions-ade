import React, { useState } from "react";

/* ───────────────── Palette échantillonnée dans le logo ADE ───────────────── */
const C = {
  ink: "#1C1625", p900: "#201434", p700: "#3D2661", p500: "#573785",
  p300: "#A391BC", p100: "#E7E3EE", paper: "#F9F8FB", grey: "#8B8B8B",
  line: "#E2DEEA", white: "#FFFFFF", ok: "#3C6B4E", closed: "#8B3A4A",
};

/* ───────────────────────────── Traductions ──────────────────────────────── */
const T = {
  fr: {
    heroTitle: "Inscription aux auditions rodages",
    nav_home: "Auditions", nav_cancel: "Mes passages", nav_acc: "Espace accompagnateur·rice·s", nav_admin: "Administration",
    upcoming: (d) => `Inscriptions le ${d}`, open: "Inscriptions ouvertes", full: "Complet", past: "Terminée",
    minLeft: (d) => `${d} restantes`, limitLabel: "Limite",
    performers: (n) => `${n} interprète·s`,
    programme: "Programme", noReg: "Aucune inscription pour l'instant. Le programme se composera ici.", withAcc: "avec accompagnateur·rice", back: "← Toutes les auditions",
    register: "S'inscrire", name: "Nom et prénom",
    warnTitle: "Avant de continuer",
    warnBody: "N’inscris aucune information personnelle sur ce site, en dehors de ton nom et prénom. Ni adresse, ni téléphone, ni date de naissance, ni aucune autre donnée sensible : seuls le nom, le prénom, le répertoire et le temps de jeu sont nécessaires.",
    warnOk: "J’ai compris",
    codeCreate: "Crée ton code à 4 chiffres",
    codeCreateHint: "Choisis un code personnel connu de toi seul·e. Il te servira à te réinscrire et à te désinscrire. Ne le partage pas.",
    codeConfirm: "Confirme",
    codeEnter: "Ton code à 4 chiffres",
    codeEnterHint: "Un code existe déjà pour ce nom : saisis-le pour confirmer que c’est bien toi.",
    codeWrong: "Code incorrect pour ce nom.",
    codeBad: "Le code doit comporter exactement 4 chiffres.",
    codeWeak: "Code trop simple : choisis-en un moins évident.",
    codeMismatch: "Les deux codes ne correspondent pas.",
    codeSavedNew: "Ton code personnel est enregistré. Garde-le : il te servira à chaque inscription et pour te désinscrire. Ne le partage pas.",
    codeSavedReturning: "Inscription confirmée avec ton code habituel.",
    regsManageLabel: "Inscriptions (suppression)",
    regsManageHint: "Supprime une inscription indésirable (ex. inscription faite sans le consentement de la personne).",
    removeReg: "Supprimer",
    codesLabel: "Codes des participant·e·s",
    codesHint: "Tu peux définir ou réinitialiser le code d’une personne (oubli, litige, inscription à corriger).",
    noCodeYet: "aucun code",
    save: "Enregistrer",
    codeSetName: "Nom (pour définir un code)",
    codeSetBtn: "Définir",
    confirmTitle: "Confirmer l’action",
    confirmYes: "Confirmer",
    confirmCancel: "Annuler",
    confirmDelAudition: (x) => `Supprimer l’audition « ${x} » et toutes ses inscriptions ? Action irréversible.`,
    confirmDelReg: (x) => `Supprimer l’inscription de ${x} ?`,
    confirmSetCode: (x) => `Modifier le code de ${x} ?`,
    confirmDelAcc: (x) => `Retirer l’accompagnateur·rice ${x} ?`,
    repertoire: "Répertoire",
    nameHint: "En groupe, séparez les noms par une virgule ; le premier nom est celui qui compte pour l’inscription.",
    composerLabel: "Compositeur·rice", workLabel: "Œuvre", repHint: "Opus (ou BWV, KV…), numéro, tonalité…",
    salleLabel: "Salle", scheduleLabel: "Horaire", accToConfirm: "à confirmer",
    work: (i) => `Œuvre ${i}`, removeWork: "retirer", addWork: "+ Ajouter une œuvre", duration: "Durée", totalDur: "Durée totale",
    accLabel: "J'ai besoin d'un·e pianiste accompagnateur·rice",
    scorePaper: "Je remettrai les partitions papier à l'avance",
    scorePdf: "J'envoie un PDF des partitions",
    attachPdf: "Joindre le PDF", pdfReplace: "Remplacer le PDF",
    pagesLabel: "Pages que l'accompagnateur·rice doit préparer", rangeFrom: "de la p.", rangeTo: "à", addRange: "+ Ajouter une plage de pages", removeRange: "retirer",
    submit: "Confirmer mon inscription",
    notOpenEarly: (d) => `Les inscriptions ouvriront le ${d}.`, notOpenFull: "Les inscriptions sont closes : la limite de temps est atteinte.", notOpenPast: "Cette audition est passée.",
    errName: "Indique ton nom.", errWork: "Indique au moins une œuvre.", errDur: "Indique la durée de chaque œuvre.",
    errOver: (left, want) => `Il reste ${left} ; ton programme en fait ${want}. Allège-le ou choisis une autre audition.`,
    confirmed: "Inscription confirmée", noteCode: "Note ton code d'annulation : c'est lui, et lui seul, qui te permettra de te désinscrire.",
    cancelCode: "Code d'annulation", another: "Inscrire quelqu'un d'autre",
    cancelTitle: "Mes passages", cancelLead: "Saisis ton nom et ton code pour consulter, modifier ou annuler tes passages.", cancelBtn: "Annuler mon inscription", cancelOk: (n) => `Inscription de ${n} annulée.`, cancelNo: "Le nom et le code ne correspondent à aucune inscription.",
    consult: "Consulter",
    editBtn: "Modifier les œuvres",
    saveEdits: "Enregistrer les modifications",
    unregister: "Se désinscrire",
    unregisterAsk: "Retape ton code à 4 chiffres pour confirmer la désinscription.",
    editSaved: "Passage mis à jour.",
    noPassages: "Aucune inscription à ton nom pour le moment.",
    errAlready: "Tu es déjà inscrit·e à cette audition. Pour ajouter ou retirer des œuvres, ou te désinscrire, va dans « Mes passages ».",
    accLead: "Validez les participations que vous prenez en charge et consultez les partitions à préparer.",
    enter: "Entrer", passLabel: "Code d'accès", passWrong: "Code incorrect.", whoAreYou: "Qui êtes-vous ?", presentHere: "Je serai présent·e",
    requests: "Partitions à préparer", accPaper: "partitions papier (remises à l'avance)", accPdf: "PDF joint", accView: "Ouvrir le PDF", accNone: "Personne ne demande d'accompagnement pour le moment.", pagesShort: "Pages",
    accPending: "Accompagnateur·rice — à confirmer (si disponible le jour de l'audition)", accWith: (n) => `Accompagnateur·rice : ${n}`,
    validate: "Je m'en occupe", validatedYou: "✓ Validé par vous — partitions reçues", takenBy: (n) => `Pris en charge par ${n}`, undo: "annuler",
    adminLead: "Créer et gérer les auditions et les accompagnateur·rice·s.",
    newAudition: "Nouvelle audition", aTitle: "Intitulé", aDate: "Date et heure", aLoc: "Lieu", aLimit: "Limite de temps de jeu (min)", create: "Publier l'audition", existing: "Auditions publiées", deleteA: "supprimer",
    accListLabel: "Accompagnateur·rice·s", accAdd: "Ajouter", accNamePh: "Nom de l'accompagnateur·rice",
    frozen: "Programme figé",
    notOpenFrozen: (d) => `Le programme est figé (moins de 24 heures avant l'audition) : les inscriptions sont closes. Pour annuler ton passage, écris un e-mail à l’ADE en précisant l’audition du ${d}.`,
    freezeNote: (d) => `Le programme se fige 24 heures avant l'audition. Jusque-là, tu peux modifier ou annuler ton passage ici avec ton code. Passé ce délai, durant les dernières 24 heures, l'annulation reste possible uniquement en écrivant un e-mail à l’ADE pour signaler que tu annules ton passage à l'audition du ${d}.`,
    penaltyNote: "En cas d'absence non signalée le jour de l'audition, tu ne pourras t'inscrire aux prochaines auditions rodages qu’une semaine avant la date, au lieu d'un mois.",
    modalOk: "J'ai compris", recapTitle: "Ton programme",
    penaltyBlocked: (dt) => `Une absence non signalée à une précédente audition a été enregistrée à ton nom. Tu ne peux donc t’inscrire qu’une semaine avant la date, au lieu d'un mois. Les inscriptions te seront ouvertes pour cette audition le ${dt}.`,
    cancelFrozen: (d) => `Le programme de cette audition est figé, ou l'audition est passée : l'annulation en ligne n'est plus possible. Écris un e-mail à l’ADE en précisant que tu annules ton passage à l'audition du ${d}.`,
    absencesLabel: "Absences (auditions passées)", noShow: "absent·e sans prévenir",
    codeStable: "Ce code est le même à chaque inscription — tu peux le mémoriser.",
    search: "Rechercher", cancelPick: "Tes inscriptions", cancelNone2: "Aucune inscription en cours à ce nom.",
    pdfBtn: "Programme (PDF)", sheetTitle: (d) => `Audition rodage du ${d}`, printBtn: "Imprimer / Enregistrer en PDF", close: "Fermer",
  },
  en: {
    heroTitle: "Run-through audition sign-up",
    nav_home: "Auditions", nav_cancel: "My slots", nav_acc: "Accompanists", nav_admin: "Admin",
    upcoming: (d) => `Opens ${d}`, open: "Registration open", full: "Full", past: "Past",
    minLeft: (d) => `${d} left`, limitLabel: "Limit",
    performers: (n) => `${n} performer${n === 1 ? "" : "s"}`,
    programme: "Programme", noReg: "No registrations yet. The programme will take shape here.", withAcc: "with accompanist", back: "← All auditions",
    register: "Register", name: "Full name",
    warnTitle: "Before you continue",
    warnBody: "Do not enter any personal information on this site other than your first and last name. No address, phone number, date of birth or any other sensitive data: only your name, repertoire and playing time are needed.",
    warnOk: "I understand",
    codeCreate: "Create your 4-digit code",
    codeCreateHint: "Choose a personal code known only to you. You’ll use it to register again and to cancel. Don’t share it.",
    codeConfirm: "Confirm",
    codeEnter: "Your 4-digit code",
    codeEnterHint: "A code already exists for this name: enter it to confirm it’s really you.",
    codeWrong: "Wrong code for this name.",
    codeBad: "The code must be exactly 4 digits.",
    codeWeak: "Code too simple: choose a less obvious one.",
    codeMismatch: "The two codes don’t match.",
    codeSavedNew: "Your personal code is saved. Keep it: you’ll need it for every registration and to cancel. Don’t share it.",
    codeSavedReturning: "Registration confirmed with your usual code.",
    regsManageLabel: "Registrations (removal)",
    regsManageHint: "Remove an unwanted registration (e.g. one made without the person’s consent).",
    removeReg: "Remove",
    codesLabel: "Participants’ codes",
    codesHint: "You can set or reset someone’s code (forgotten code, dispute, registration to fix).",
    noCodeYet: "no code",
    save: "Save",
    codeSetName: "Name (to set a code)",
    codeSetBtn: "Set",
    confirmTitle: "Confirm action",
    confirmYes: "Confirm",
    confirmCancel: "Cancel",
    confirmDelAudition: (x) => `Delete the audition “${x}” and all its registrations? This cannot be undone.`,
    confirmDelReg: (x) => `Delete ${x}’s registration?`,
    confirmSetCode: (x) => `Change ${x}’s code?`,
    confirmDelAcc: (x) => `Remove accompanist ${x}?`,
    repertoire: "Repertoire",
    nameHint: "As a group, separate names with a comma; the first name is the one that counts for the registration.",
    composerLabel: "Composer", workLabel: "Work", repHint: "Opus (or BWV, KV…), number, key…",
    salleLabel: "Room", scheduleLabel: "Time", accToConfirm: "to be confirmed",
    work: (i) => `Work ${i}`, removeWork: "remove", addWork: "+ Add a work", duration: "Duration", totalDur: "Total duration",
    accLabel: "I need a piano accompanist",
    scorePaper: "I'll hand in paper scores in advance",
    scorePdf: "I'll send a PDF of the scores",
    attachPdf: "Attach PDF", pdfReplace: "Replace PDF",
    pagesLabel: "Pages the accompanist should prepare", rangeFrom: "from p.", rangeTo: "to", addRange: "+ Add a page range", removeRange: "remove",
    submit: "Confirm registration",
    notOpenEarly: (d) => `Registration opens ${d}.`, notOpenFull: "Registration is closed: the time limit has been reached.", notOpenPast: "This audition has passed.",
    errName: "Please enter your name.", errWork: "Please enter at least one work.", errDur: "Please enter the duration of each work.",
    errOver: (left, want) => `${left} remain; your programme is ${want}. Trim it or choose another audition.`,
    confirmed: "Registration confirmed", noteCode: "Note your cancellation code: it is the only way to cancel your registration.",
    cancelCode: "Cancellation code", another: "Register someone else",
    cancelTitle: "My slots", cancelLead: "Enter your name and code to view, edit or cancel your slots.", cancelBtn: "Cancel my registration", cancelOk: (n) => `${n}'s registration cancelled.`, cancelNo: "The name and code don’t match any registration.",
    consult: "View",
    editBtn: "Edit works",
    saveEdits: "Save changes",
    unregister: "Unregister",
    unregisterAsk: "Re-enter your 4-digit code to confirm you want to unregister.",
    editSaved: "Slot updated.",
    noPassages: "No registration under your name yet.",
    errAlready: "You’re already registered for this audition. To add or remove works, or to unregister, go to “My slots”.",
    accLead: "Confirm the slots you take on and view the scores to prepare.",
    enter: "Enter", passLabel: "Access code", passWrong: "Wrong code.", whoAreYou: "Who are you?", presentHere: "I'll be there",
    requests: "Scores to prepare", accPaper: "paper scores (handed in advance)", accPdf: "PDF attached", accView: "Open PDF", accNone: "No one is requesting accompaniment yet.", pagesShort: "Pages",
    accPending: "Accompanist — to be confirmed (if available on the day)", accWith: (n) => `Accompanist: ${n}`,
    validate: "I'll take this", validatedYou: "✓ Confirmed by you — scores received", takenBy: (n) => `Taken by ${n}`, undo: "undo",
    adminLead: "Create and manage auditions and accompanists.",
    newAudition: "New audition", aTitle: "Title", aDate: "Date and time", aLoc: "Location", aLimit: "Playing-time limit (min)", create: "Publish audition", existing: "Published auditions", deleteA: "delete",
    accListLabel: "Accompanists", accAdd: "Add", accNamePh: "Accompanist's name",
    frozen: "Locked",
    notOpenFrozen: (d) => `The programme is locked (less than 24 hours before the audition): registration is closed. To cancel your slot, email the ADE mentioning the audition on ${d}.`,
    freezeNote: (d) => `The programme locks 24 hours before the audition. Until then, you can edit or cancel your slot here with your code. After that, during the final 24 hours, cancellation is only possible by emailing the ADE to report that you withdraw from the audition on ${d}.`,
    penaltyNote: "If you fail to attend without notice on the day, you'll only be able to register for future run-through auditions 1 week before the date, instead of a month.",
    modalOk: "Got it", recapTitle: "Your programme",
    penaltyBlocked: (dt) => `A no-show without notice at a previous audition has been recorded under your name. You can therefore only register 1 week before the date, instead of a month. Registration will open for this audition on ${dt}.`,
    cancelFrozen: (d) => `This audition's programme is locked, or the audition has passed: online cancellation is no longer possible. Email the ADE to report that you withdraw from the audition on ${d}.`,
    absencesLabel: "No-shows (past auditions)", noShow: "no-show, no notice",
    codeStable: "This code is the same every time you register — you can memorise it.",
    search: "Find", cancelPick: "Your registrations", cancelNone2: "No current registration under this name.",
    pdfBtn: "Programme (PDF)", sheetTitle: (d) => `Run-through audition — ${d}`, printBtn: "Print / Save as PDF", close: "Close",
  },
};

const LANGS = [["fr", "Français"], ["en", "English"]];
const LOCALE = { fr: "fr-CH", en: "en-GB" };
const TOL = 3, DAY = 86400000, now = Date.now();

const OPEN_FULL = 30, OPEN_PEN = 7, FREEZE = 1; // jours (gel 24 h avant)
const norm = (s) => (s || "").trim().toLowerCase();
const firstOf = (s) => (s || "").split(",")[0].trim(); // premier nom (groupe) = celui qui compte

/* ───────────────────────────── Helpers ──────────────────────────────────── */
const CODE_SALT = "ADE-rodage-2026"; // EN PRODUCTION : secret côté serveur, jamais exposé dans le front
function codeFor(name) {
  const s = norm(name) + CODE_SALT;
  let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return String(h % 10000).padStart(4, "0");
}
const workSecs = (works) => works.reduce((s, w) => s + (Number(w.sec) || 0), 0);
const sumRegs = (regs) => regs.reduce((s, r) => s + workSecs(r.works), 0);
function fmtDur(sec) { sec = Math.max(0, Math.round(Number(sec) || 0)); const m = Math.floor(sec / 60), s = sec % 60; return s === 0 ? `${m}′` : `${m}′${String(s).padStart(2, "0")}″`; }
function fmtPages(pages) { return (pages || []).filter((p) => p.from && p.to).map((p) => `${p.from}–${p.to}`).join(", "); }
function fmtDate(v, lang) { const d = new Date(v); if (isNaN(d.getTime())) return ""; try { return d.toLocaleDateString(LOCALE[lang] || "en-GB", { weekday: "long", day: "numeric", month: "long" }); } catch { return d.toLocaleDateString(undefined, { day: "numeric", month: "long" }); } }
function fmtShort(v, lang) { const d = new Date(v); if (isNaN(d.getTime())) return ""; try { return d.toLocaleDateString(LOCALE[lang] || "en-GB", { day: "numeric", month: "long" }); } catch { return d.toLocaleDateString(undefined, { day: "numeric", month: "long" }); } }
function fmtDateTime(v, lang) { const d = new Date(v); if (isNaN(d.getTime())) return ""; try { return d.toLocaleString(LOCALE[lang] || "en-GB", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }); } catch { return fmtShort(v, lang); } }
function fmtTime(v, lang) { const d = new Date(v); if (isNaN(d.getTime())) return ""; try { return d.toLocaleTimeString(LOCALE[lang] || "en-GB", { hour: "2-digit", minute: "2-digit" }); } catch { return ""; } }
function status(a, regs) {
  const date = new Date(a.date).getTime();
  const opens = date - OPEN_FULL * DAY, freeze = date - FREEZE * DAY;
  const remaining = (a.limit + TOL) * 60 - sumRegs(regs);
  if (now > date) return { s: "past", remaining, date };
  if (now >= freeze) return { s: "frozen", remaining, date };
  if (remaining <= 0) return { s: "full", remaining: 0, date };
  if (now < opens) return { s: "upcoming", opens, remaining, date };
  return { s: "open", remaining, date };
}

/* ───────────────────────────── Styles ───────────────────────────────────── */
const sans = "Montserrat, system-ui, sans-serif", serif = "Spectral, Georgia, serif";
const eyebrow = { fontFamily: sans, fontWeight: 600, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.grey };
const input = { width: "100%", boxSizing: "border-box", padding: "11px 13px", border: `1px solid ${C.line}`, borderRadius: 7, background: C.white, fontFamily: sans, fontSize: 15, color: C.ink, outline: "none" };
const label = { fontFamily: sans, fontWeight: 600, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: C.grey, display: "block", marginBottom: 6 };
const btn = (v = "solid") => ({ fontFamily: sans, fontWeight: 600, fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase", border: v === "ghost" ? `1px solid ${C.line}` : "none", borderRadius: 7, cursor: "pointer", padding: "12px 20px", background: v === "solid" ? C.p500 : v === "danger" ? C.closed : "transparent", color: v === "ghost" ? C.p500 : C.white });

/* ───────────────────────────── App ──────────────────────────────────────── */
export default function App() {
  const [lang, setLang] = useState(null);
  const [auditions, setAuditions] = useState([]);
  const [regs, setRegs] = useState({});
  const [accompanists, setAccompanists] = useState([]);
  const [penalized, setPenalized] = useState([]);
  const [codes, setCodes] = useState({});
  const [view, setView] = useState("home");
  const [sel, setSel] = useState(null);
  const [ack, setAck] = useState(false);

  if (!lang) return <LangGate onPick={setLang} />;
  const t = T[lang];
  if (!ack) return <Warning t={t} onOk={() => setAck(true)} />;
  const go = (v, id = null) => { setView(v); setSel(id); window.scrollTo(0, 0); };
  const toggleNoShow = (name) => { const n = norm(name); setPenalized((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n])); };
  const validateReg = (aid, rid, accId) => setRegs((p) => ({ ...p, [aid]: p[aid].map((r) => (r.id === rid ? { ...r, validatedBy: accId } : r)) }));
  const saveCode = (name, code) => setCodes((c) => ({ ...c, [norm(firstOf(name))]: code }));
  const delReg = (aid, rid) => setRegs((p) => ({ ...p, [aid]: (p[aid] || []).filter((r) => r.id !== rid) }));
  const editReg = (aid, rid, works) => setRegs((p) => ({ ...p, [aid]: p[aid].map((r) => (r.id === rid ? { ...r, works } : r)) }));

  return (
    <Frame>
      <Header t={t} lang={lang} setLang={setLang} view={view} go={go} />
      <main style={{ padding: "28px 18px 60px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {view === "home" && <Home t={t} lang={lang} auditions={auditions} regs={regs} open={(id) => go("audition", id)} />}
          {view === "audition" && <Detail t={t} lang={lang} audition={auditions.find((a) => a.id === sel)} regs={regs[sel] || []} accompanists={accompanists} penalized={penalized} codes={codes} onSaveCode={saveCode}
            onRegister={(reg) => setRegs((p) => ({ ...p, [sel]: [...(p[sel] || []), reg] }))} back={() => go("home")} />}
          {view === "cancel" && <MyPassages t={t} lang={lang} auditions={auditions} regs={regs} codes={codes} onCancel={delReg} onEditReg={editReg} />}
          {view === "acc" && <AccSpace t={t} lang={lang} auditions={auditions} regs={regs} accompanists={accompanists} onValidate={validateReg} />}
          {view === "admin" && <Admin t={t} lang={lang} auditions={auditions} regs={regs} accompanists={accompanists} penalized={penalized} codes={codes} onSaveCode={saveCode} onDeleteReg={delReg} onToggleNoShow={toggleNoShow}
            onCreate={(a) => { setAuditions((p) => [...p, a]); setRegs((p) => ({ ...p, [a.id]: [] })); }}
            onDelete={(id) => setAuditions((p) => p.filter((a) => a.id !== id))}
            onAddAcc={(name, code) => setAccompanists((p) => [...p, { id: "ac" + Date.now(), name, code }])}
            onDelAcc={(id) => setAccompanists((p) => p.filter((x) => x.id !== id))} />}
        </div>
      </main>
    </Frame>
  );
}

/* ───────────────────────────── Coquille + polices ───────────────────────── */
function Frame({ children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid ${C.p500}; outline-offset: 2px; }
        input:focus { border-color: ${C.p500}; }
        @media (prefers-reduced-motion: no-preference){ .fade{ animation: f .4s ease both } @keyframes f{from{opacity:0;transform:translateY(6px)}to{opacity:1}} }
        @media print {
          body * { visibility: hidden !important; }
          .sheet, .sheet * { visibility: visible !important; }
          .sheet { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: C.paper, fontFamily: sans }}>{children}</div>
    </>
  );
}

/* ───────────────────────────── Écran de langue ──────────────────────────── */
function Warning({ t, onOk }) {
  return (
    <Frame>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div className="fade" style={{ background: C.white, borderRadius: 14, maxWidth: 440, width: "100%", padding: "34px 30px", textAlign: "center", boxShadow: "0 10px 40px rgba(32,20,52,.10)" }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.p100, color: C.p500, fontFamily: serif, fontWeight: 600, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>!</div>
          <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: C.ink, margin: "0 0 12px" }}>{t.warnTitle}</h2>
          <p style={{ fontFamily: sans, fontSize: 14.5, color: C.grey, lineHeight: 1.6, margin: "0 0 26px" }}>{t.warnBody}</p>
          <button onClick={onOk} style={{ ...btn(), width: "100%" }}>{t.warnOk}</button>
        </div>
      </div>
    </Frame>
  );
}


function LangGate({ onPick }) {
  return (
    <Frame>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 34, lineHeight: 1.15, color: C.ink, margin: 0, maxWidth: 420 }}>Inscription aux auditions rodages</h1>
        <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: C.p500, marginTop: 14 }}>
          ADE <span style={{ color: C.p300 }}>—</span> <span style={{ color: C.grey }}>Association des étudiants</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 42 }}>
          {LANGS.map(([k, lbl]) => (
            <button key={k} onClick={() => onPick(k)} className="fade" style={{ ...btn("ghost"), padding: "14px 26px", fontSize: 14, background: C.white }}>{lbl}</button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ───────────────────────────── Marque + en-tête ─────────────────────────── */
function Wordmark() {
  return (
    <div style={{ textAlign: "left" }}>
      <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 26, letterSpacing: ".04em", color: C.p500, lineHeight: 1 }}>ADE</div>
      <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: C.grey, marginTop: 6 }}>Association des étudiants · HEMU</div>
    </div>
  );
}
function Header({ t, lang, setLang, view, go }) {
  const tabs = [["home", t.nav_home], ["cancel", t.nav_cancel], ["acc", t.nav_acc], ["admin", t.nav_admin]];
  return (
    <header style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "18px 18px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <button onClick={() => go("home")} style={{ border: "none", background: "none", cursor: "pointer", padding: 0 }}><Wordmark /></button>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ ...input, width: "auto", padding: "7px 10px", fontSize: 13, color: C.grey, fontWeight: 600 }}>
            {LANGS.map(([k, lbl]) => <option key={k} value={k}>{lbl}</option>)}
          </select>
        </div>
        <nav style={{ display: "flex", gap: 2, marginTop: 16, overflowX: "auto" }}>
          {tabs.map(([k, lbl]) => (
            <button key={k} onClick={() => go(k)} style={{ border: "none", background: "none", cursor: "pointer", whiteSpace: "nowrap", padding: "10px 12px", marginBottom: -1, fontFamily: sans, fontSize: 13, fontWeight: view === k ? 600 : 500, letterSpacing: ".03em", color: view === k ? C.p500 : C.grey, borderBottom: `2px solid ${view === k ? C.p500 : "transparent"}` }}>{lbl}</button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Badge({ st, t, lang }) {
  const map = { open: { txt: t.open, bg: "#E8F1EA", c: C.ok }, upcoming: { txt: t.upcoming(fmtShort(st.opens, lang)), bg: C.p100, c: C.p700 }, full: { txt: t.full, bg: "#F4E7EA", c: C.closed }, frozen: { txt: t.frozen, bg: "#EFEEF2", c: C.p700 }, past: { txt: t.past, bg: "#EFEEF2", c: C.grey } }[st.s];
  return <span style={{ fontFamily: sans, fontWeight: 600, fontSize: 11, letterSpacing: ".03em", background: map.bg, color: map.c, padding: "5px 11px", borderRadius: 99, whiteSpace: "nowrap" }}>{map.txt}</span>;
}

/* ───────────────────────────── Accueil ──────────────────────────────────── */
function Home({ t, lang, auditions, regs, open }) {
  const sorted = [...auditions].sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <div className="fade">
      <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 31, lineHeight: 1.15, color: C.ink, margin: "4px 0 22px" }}>{t.heroTitle}</h1>
      <div style={{ ...eyebrow, marginBottom: 14 }}>{t.nav_home}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {sorted.map((a) => {
          const st = status(a, regs[a.id] || []);
          return (
            <button key={a.id} onClick={() => open(a.id)} style={{ textAlign: "left", border: `1px solid ${C.line}`, borderRadius: 12, background: C.white, cursor: "pointer", padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span style={{ fontFamily: serif, fontWeight: 500, fontSize: 21, color: C.ink, lineHeight: 1.25 }}>{a.title}</span>
                <Badge st={st} t={t} lang={lang} />
              </div>
              <div style={{ fontFamily: sans, fontSize: 13.5, color: C.grey }}>{fmtDate(a.date, lang)}{a.location ? ` · ${a.location}` : ""}</div>
              <div style={{ display: "flex", gap: 16, fontFamily: sans, fontSize: 13, color: C.p700, fontWeight: 500 }}>
                <span>{t.performers((regs[a.id] || []).length)}</span>
                {st.s === "open" && <span>· {t.minLeft(fmtDur(st.remaining))}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────── Détail ───────────────────────────────────── */
function Detail({ t, lang, audition, regs, accompanists, penalized, codes, onSaveCode, onRegister, back }) {
  const st = status(audition, regs), total = sumRegs(regs);
  return (
    <div className="fade">
      <button onClick={back} style={{ border: "none", background: "none", color: C.grey, fontFamily: sans, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "0 0 14px" }}>{t.back}</button>
      <h1 style={{ fontFamily: serif, fontWeight: 600, fontSize: 28, color: C.ink, margin: "0 0 6px", lineHeight: 1.2 }}>{audition.title}</h1>
      <div style={{ fontFamily: serif, fontStyle: "italic", fontSize: 16, color: C.p500, marginBottom: 4 }}>{fmtDate(audition.date, lang)}</div>
      <div style={{ fontFamily: sans, fontSize: 13.5, color: C.grey, marginBottom: 14 }}>{audition.location}</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 26 }}>
        <Badge st={st} t={t} lang={lang} />
        <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{t.limitLabel} {audition.limit} min · {fmtDur(total)}</span>
      </div>
      <Programme t={t} regs={regs} accompanists={accompanists} />
      <div style={{ marginTop: 30 }}>
        {st.s === "open" ? <RegForm t={t} lang={lang} remaining={st.remaining} audition={audition} regs={regs} penalized={penalized} codes={codes} onSaveCode={onSaveCode} onRegister={onRegister} />
          : <Notice>{st.s === "upcoming" ? t.notOpenEarly(fmtShort(st.opens, lang)) : st.s === "frozen" ? t.notOpenFrozen(fmtShort(audition.date, lang)) : st.s === "full" ? t.notOpenFull : t.notOpenPast}</Notice>}
      </div>
    </div>
  );
}

/* ───────────────────────────── Programme ────────────────────────────────── */
function Programme({ t, regs, accompanists }) {
  if (regs.length === 0) return <Notice>{t.noReg}</Notice>;
  return (
    <section>
      <div style={{ textAlign: "center", marginBottom: 18 }}><div style={eyebrow}>{t.programme}</div></div>
      {regs.map((r, i) => {
        const accName = r.validatedBy ? (accompanists.find((a) => a.id === r.validatedBy) || {}).name : null;
        return (
          <div key={r.id} style={{ padding: "15px 0", borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
            <span style={{ fontFamily: serif, fontWeight: 500, fontSize: 18, color: C.ink }}>{r.name}</span>
            {r.works.map((w, j) => (
              <div key={j} style={{ display: "flex", justifyContent: "space-between", gap: 14, marginTop: 5 }}>
                <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 15, color: C.p900, lineHeight: 1.45 }}>{(w.composer ? w.composer + ", " : "") + w.text}</span>
                <span style={{ fontFamily: sans, fontSize: 13, color: C.p500, whiteSpace: "nowrap" }}>{fmtDur(w.sec)}</span>
              </div>
            ))}
            {r.accompanist && (
              <div style={{ fontFamily: sans, fontSize: 12.5, color: accName ? C.p500 : C.grey, fontStyle: accName ? "normal" : "italic", marginTop: 7 }}>
                {accName ? t.accWith(accName) : t.accPending}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

/* ───────────────────────────── Formulaire ───────────────────────────────── */
function RegForm({ t, lang, remaining, audition, regs, penalized, codes, onSaveCode, onRegister }) {
  const [name, setName] = useState("");
  const [works, setWorks] = useState([{ composer: "", text: "", min: "", sec: "" }]);
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [acc, setAcc] = useState(false);
  const [score, setScore] = useState("paper");
  const [pdf, setPdf] = useState(null);
  const [pages, setPages] = useState([{ from: "", to: "" }]);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);

  const total = works.reduce((s, w) => s + (Number(w.min) || 0) * 60 + (Number(w.sec) || 0), 0);
  const existing = name.trim() ? codes[norm(firstOf(name))] : undefined; // code déjà défini pour ce nom ?
  const pen = penalized.includes(norm(firstOf(name)));
  const personOpen = new Date(audition.date).getTime() - (pen ? OPEN_PEN : OPEN_FULL) * DAY;
  const blocked = pen && now < personOpen;
  const setW = (i, k, v) => setWorks((w) => w.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const setP = (i, k, v) => setPages((p) => p.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const reset = () => { setDone(null); setName(""); setWorks([{ composer: "", text: "", min: "", sec: "" }]); setPin(""); setPin2(""); setAcc(false); setScore("paper"); setPdf(null); setPages([{ from: "", to: "" }]); };

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(27,22,37,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 50 }}>
      <div className="fade" style={{ background: C.white, borderRadius: 14, padding: 24, maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ ...eyebrow, color: C.ok }}>{t.confirmed}</div>
        <div style={{ ...label, margin: "16px 0 8px" }}>{t.recapTitle}</div>
        <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 17, color: C.ink, marginBottom: 6 }}>{done.name}</div>
        {done.works.map((w, j) => (
          <div key={j} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 3 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: C.p900 }}>{(w.composer ? w.composer + ", " : "") + w.text}</span>
            <span style={{ fontFamily: sans, fontSize: 12.5, color: C.p500, whiteSpace: "nowrap" }}>{fmtDur(w.sec)}</span>
          </div>
        ))}
        <div style={{ fontFamily: sans, fontSize: 13, color: C.grey, marginTop: 8 }}>{t.totalDur} : <b style={{ color: C.ink }}>{fmtDur(done.total)}</b></div>
        <div style={{ padding: 14, background: C.p100, borderRadius: 9, margin: "16px 0" }}>
          <div style={{ fontFamily: sans, fontSize: 12.5, color: C.p700, lineHeight: 1.6 }}>{done.isNew ? t.codeSavedNew : t.codeSavedReturning}</div>
        </div>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, lineHeight: 1.6, marginBottom: 10 }}>{t.freezeNote(fmtShort(audition.date, lang))}</div>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: C.closed, lineHeight: 1.6, marginBottom: 18 }}>{t.penaltyNote}</div>
        <button style={btn()} onClick={reset}>{t.modalOk}</button>
      </div>
    </div>
  );

  function handleFile(e) { const f = e.target.files && e.target.files[0]; if (f) setPdf({ name: f.name, url: URL.createObjectURL(f) }); }
  function submit() {
    if (blocked) return;
    if (!name.trim()) return setErr(t.errName);
    if ((regs || []).some((r) => norm(firstOf(r.name)) === norm(firstOf(name)))) return setErr(t.errAlready);
    const valid = works.filter((w) => w.text.trim());
    if (!valid.length) return setErr(t.errWork);
    if (valid.some((w) => !((Number(w.min) || 0) * 60 + (Number(w.sec) || 0)))) return setErr(t.errDur);
    if (total > remaining) return setErr(t.errOver(fmtDur(remaining), fmtDur(total)));
    // Code personnel : soit on le confirme (déjà défini), soit on le crée (première inscription)
    const key = norm(firstOf(name));
    const already = codes[key];
    if (already) {
      if (pin.trim() !== already) return setErr(t.codeWrong);
    } else {
      if (!/^\d{4}$/.test(pin.trim())) return setErr(t.codeBad);
      if (["0000", "1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "1234", "4321", "0123", "2580"].includes(pin.trim())) return setErr(t.codeWeak);
      if (pin.trim() !== pin2.trim()) return setErr(t.codeMismatch);
    }
    setErr("");
    if (!already) onSaveCode(name, pin.trim()); // première inscription : on enregistre le code choisi
    const built = valid.map((w) => ({ composer: w.composer.trim(), text: w.text.trim(), sec: (Number(w.min) || 0) * 60 + (Number(w.sec) || 0) }));
    onRegister({
      id: "n" + Date.now(), name: name.trim(), works: built,
      accompanist: acc, score: acc ? score : null,
      pdf: acc && score === "pdf" ? pdf : null,
      pages: acc && score === "pdf" ? pages.filter((p) => p.from && p.to) : [],
      validatedBy: null, code: pin.trim(),
    });
    setDone({ name: name.trim(), works: built, total, isNew: !already });
  }

  return (
    <Card>
      <div style={{ ...eyebrow, marginBottom: 16 }}>{t.register}</div>
      <div style={{ marginBottom: 16 }}>
        <label style={label}>{t.name}</label>
        <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, fontStyle: "italic", marginBottom: 6 }}>{t.nameHint}</div>
        <input style={input} value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {blocked && <div style={{ fontFamily: sans, fontSize: 13.5, color: C.closed, lineHeight: 1.6, background: "#F4E7EA", borderRadius: 8, padding: "12px 14px", margin: "-4px 0 16px" }}>{t.penaltyBlocked(fmtDateTime(personOpen, lang))}</div>}

      <div style={{ border: `1px solid ${C.line}`, borderRadius: 9, padding: "12px 14px", marginBottom: 18, background: C.paper }}>
        {existing ? (
          <>
            <label style={label}>{t.codeEnter}</label>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.grey, fontStyle: "italic", marginBottom: 8 }}>{t.codeEnterHint}</div>
            <input style={{ ...input, letterSpacing: ".28em", maxWidth: 150 }} inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
          </>
        ) : (
          <>
            <label style={label}>{t.codeCreate}</label>
            <div style={{ fontFamily: sans, fontSize: 12, color: C.grey, fontStyle: "italic", marginBottom: 8 }}>{t.codeCreateHint}</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input style={{ ...input, letterSpacing: ".28em", maxWidth: 150 }} inputMode="numeric" maxLength={4} placeholder="••••" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
              <input style={{ ...input, letterSpacing: ".28em", maxWidth: 150 }} inputMode="numeric" maxLength={4} placeholder={t.codeConfirm} value={pin2} onChange={(e) => setPin2(e.target.value.replace(/\D/g, ""))} />
            </div>
          </>
        )}
      </div>

      <div style={{ ...label, marginBottom: 10 }}>{t.repertoire}</div>
      {works.map((w, i) => (
        <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 9, padding: 12, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: C.p500 }}>{t.work(i + 1)}</span>
            {works.length > 1 && <button onClick={() => setWorks((ws) => ws.filter((_, j) => j !== i))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.removeWork}</button>}
          </div>
          <input style={{ ...input, marginBottom: 8 }} placeholder={t.composerLabel} value={w.composer} onChange={(e) => setW(i, "composer", e.target.value)} />
          <textarea style={{ ...input, minHeight: 44, resize: "vertical", marginBottom: 4, fontFamily: sans }} placeholder={t.workLabel} value={w.text} onChange={(e) => setW(i, "text", e.target.value)} />
          <div style={{ fontFamily: sans, fontSize: 11.5, color: C.grey, fontStyle: "italic", marginBottom: 8 }}>{t.repHint}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{t.duration}</span>
            <input style={{ ...input, width: 60 }} type="number" min="0" placeholder="min" value={w.min} onChange={(e) => setW(i, "min", e.target.value)} />
            <span style={{ fontFamily: serif, fontSize: 16, color: C.p500 }}>′</span>
            <input style={{ ...input, width: 60 }} type="number" min="0" max="59" placeholder="sec" value={w.sec} onChange={(e) => setW(i, "sec", e.target.value)} />
            <span style={{ fontFamily: serif, fontSize: 16, color: C.p500 }}>″</span>
          </div>
        </div>
      ))}
      <button style={{ ...btn("ghost"), marginBottom: 18 }} onClick={() => setWorks((w) => [...w, { composer: "", text: "", min: "", sec: "" }])}>{t.addWork}</button>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: acc ? 12 : 18 }}>
        <input type="checkbox" checked={acc} onChange={(e) => setAcc(e.target.checked)} style={{ width: 18, height: 18, marginTop: 1, accentColor: C.p500 }} />
        <span style={{ fontFamily: sans, fontSize: 14.5, color: C.ink, lineHeight: 1.4 }}>{t.accLabel}</span>
      </label>
      {acc && (
        <div style={{ paddingLeft: 28, marginBottom: 18 }}>
          {[["paper", t.scorePaper], ["pdf", t.scorePdf]].map(([k, lbl]) => (
            <label key={k} style={{ display: "flex", gap: 9, alignItems: "center", cursor: "pointer", marginBottom: 8 }}>
              <input type="radio" name="score" checked={score === k} onChange={() => setScore(k)} style={{ width: 16, height: 16, accentColor: C.p500 }} />
              <span style={{ fontFamily: sans, fontSize: 14, color: C.ink }}>{lbl}</span>
            </label>
          ))}
          {score === "pdf" && (
            <div style={{ marginTop: 6 }}>
              <div style={{ marginBottom: 10 }}>
                <label style={{ ...label, marginBottom: 6 }}>{t.attachPdf}</label>
                <input type="file" accept="application/pdf,.pdf" onChange={handleFile}
                  style={{ fontFamily: sans, fontSize: 13, color: C.ink, maxWidth: "100%" }} />
                {pdf && <div style={{ fontFamily: sans, fontSize: 13, color: C.ok, marginTop: 6 }}>✓ {pdf.name}</div>}
              </div>

              <div style={{ ...label, marginTop: 10 }}>{t.pagesLabel}</div>
              {pages.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                  <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{t.rangeFrom}</span>
                  <input style={{ ...input, width: 64 }} type="number" min="1" value={p.from} onChange={(e) => setP(i, "from", e.target.value)} />
                  <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{t.rangeTo}</span>
                  <input style={{ ...input, width: 64 }} type="number" min="1" value={p.to} onChange={(e) => setP(i, "to", e.target.value)} />
                  {pages.length > 1 && <button onClick={() => setPages((ps) => ps.filter((_, j) => j !== i))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.removeRange}</button>}
                </div>
              ))}
              <button style={{ ...btn("ghost"), padding: "9px 14px", fontSize: 12 }} onClick={() => setPages((p) => [...p, { from: "", to: "" }])}>{t.addRange}</button>
            </div>
          )}
        </div>
      )}

      <div style={{ fontFamily: sans, fontSize: 13.5, color: total > remaining ? C.closed : C.grey, marginBottom: 14 }}>
        {t.totalDur} : <b style={{ color: total > remaining ? C.closed : C.ink }}>{fmtDur(total)}</b> · {t.minLeft(fmtDur(remaining))}
      </div>
      {err && <div style={{ fontFamily: sans, fontSize: 13.5, color: C.closed, marginBottom: 12, lineHeight: 1.5 }}>{err}</div>}
      <button style={{ ...btn(), opacity: blocked ? 0.45 : 1, cursor: blocked ? "not-allowed" : "pointer" }} disabled={blocked} onClick={submit}>{t.submit}</button>
    </Card>
  );
}

/* ─────────────────────── Mes passages (consulter / modifier / annuler) ───── */
function MyPassages({ t, lang, auditions, regs, codes, onCancel, onEditReg }) {
  const [name, setName] = useState(""); const [code, setCode] = useState("");
  const [me, setMe] = useState(null); const [err, setErr] = useState(""); const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(null); const [draft, setDraft] = useState([]); const [editErr, setEditErr] = useState("");
  const [confirmDel, setConfirmDel] = useState(null); const [delCode, setDelCode] = useState(""); const [delErr, setDelErr] = useState("");

  function verify() {
    setErr(""); setMsg("");
    if (!name.trim() || !code.trim()) return;
    const stored = codes[norm(firstOf(name))];
    if (!stored || stored !== code.trim()) { setMe(null); return setErr(t.cancelNo); }
    setMe({ name: name.trim(), key: norm(firstOf(name)), code: code.trim() });
  }
  function startEdit(reg) {
    setMsg(""); setEditErr(""); setEditing(reg.id);
    setDraft(reg.works.map((w) => ({ composer: w.composer || "", text: w.text, min: String(Math.floor(w.sec / 60)), sec: String(w.sec % 60) })));
  }
  const setD = (i, k, v) => setDraft((d) => d.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  function saveEdit(aid, reg) {
    const valid = draft.filter((w) => w.text.trim());
    if (!valid.length) return setEditErr(t.errWork);
    if (valid.some((w) => !((Number(w.min) || 0) * 60 + (Number(w.sec) || 0)))) return setEditErr(t.errDur);
    const newSec = valid.reduce((s, w) => s + (Number(w.min) || 0) * 60 + (Number(w.sec) || 0), 0);
    const auditionRegs = regs[aid] || []; const a = auditions.find((x) => x.id === aid);
    const allowedForMe = (a.limit + TOL) * 60 - (sumRegs(auditionRegs) - workSecs(reg.works));
    if (newSec > allowedForMe) return setEditErr(t.errOver(fmtDur(allowedForMe), fmtDur(newSec)));
    const built = valid.map((w) => ({ composer: w.composer.trim(), text: w.text.trim(), sec: (Number(w.min) || 0) * 60 + (Number(w.sec) || 0) }));
    onEditReg(aid, reg.id, built); setEditing(null); setMsg(t.editSaved);
  }
  function doDelete() {
    if (delCode.trim() !== (codes[me.key] || "")) return setDelErr(t.codeWrong);
    onCancel(confirmDel.aid, confirmDel.rid); setConfirmDel(null); setDelCode(""); setMsg(t.cancelOk(me.name));
  }

  // Entrée : nom + code
  if (!me) return (
    <Card className="fade">
      <div style={eyebrow}>{t.nav_cancel}</div>
      <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: C.ink, margin: "4px 0 6px" }}>{t.cancelTitle}</h2>
      <p style={{ fontFamily: sans, fontSize: 14.5, color: C.grey, margin: "0 0 16px" }}>{t.cancelLead}</p>
      <Field label={t.name}><input style={input} value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label={t.cancelCode}><input style={{ ...input, letterSpacing: ".18em", maxWidth: 160 }} inputMode="numeric" maxLength={4} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} /></Field>
      {err && <div style={{ fontFamily: sans, fontSize: 13.5, color: C.closed, marginBottom: 12 }}>{err}</div>}
      <button style={btn()} onClick={verify}>{t.consult}</button>
    </Card>
  );

  // Vue d'ensemble des passages
  const passages = [];
  for (const aid of Object.keys(regs)) for (const r of (regs[aid] || [])) if (norm(firstOf(r.name)) === me.key) passages.push({ aid, reg: r, a: auditions.find((x) => x.id === aid) });
  passages.sort((x, y) => new Date(x.a.date) - new Date(y.a.date));

  return (
    <Card className="fade">
      {confirmDel && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(27,22,37,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70 }}>
          <div className="fade" style={{ background: C.white, borderRadius: 14, padding: 24, maxWidth: 400, width: "100%" }}>
            <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 18, color: C.ink, marginBottom: 10 }}>{t.unregister}</div>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.grey, lineHeight: 1.6, margin: "0 0 14px" }}>{t.unregisterAsk}</p>
            <input style={{ ...input, letterSpacing: ".18em", maxWidth: 160, marginBottom: 8 }} inputMode="numeric" maxLength={4} value={delCode} onChange={(e) => setDelCode(e.target.value.replace(/\D/g, ""))} />
            {delErr && <div style={{ fontFamily: sans, fontSize: 13, color: C.closed, marginBottom: 10 }}>{delErr}</div>}
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <button style={{ ...btn("ghost"), flex: 1 }} onClick={() => { setConfirmDel(null); setDelCode(""); setDelErr(""); }}>{t.confirmCancel}</button>
              <button style={{ ...btn("danger"), flex: 1 }} onClick={doDelete}>{t.unregister}</button>
            </div>
          </div>
        </div>
      )}

      <div style={eyebrow}>{t.cancelTitle}</div>
      <h2 style={{ fontFamily: serif, fontWeight: 600, fontSize: 22, color: C.ink, margin: "4px 0 6px" }}>{me.name}</h2>
      {msg && <div style={{ fontFamily: sans, fontSize: 14, color: C.ok, margin: "6px 0 12px" }}>{msg}</div>}

      {passages.length === 0
        ? <div style={{ fontFamily: sans, fontSize: 14, color: C.grey, marginTop: 12 }}>{t.noPassages}</div>
        : passages.map(({ aid, reg, a }) => {
          const st = status(a, regs[aid] || []); const locked = st.s === "frozen" || st.s === "past";
          const isEd = editing === reg.id;
          return (
            <div key={reg.id} style={{ padding: "16px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontFamily: serif, fontSize: 17, color: C.ink }}>{a.title}</div>
                <span style={{ fontFamily: sans, fontSize: 12, color: C.grey, whiteSpace: "nowrap" }}>{fmtShort(a.date, lang)}</span>
              </div>

              {!isEd && reg.works.map((w, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 5 }}>
                  <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: C.p900 }}>{(w.composer ? w.composer + ", " : "") + w.text}</span>
                  <span style={{ fontFamily: sans, fontSize: 12.5, color: C.p500, whiteSpace: "nowrap" }}>{fmtDur(w.sec)}</span>
                </div>
              ))}

              {isEd && (
                <div style={{ marginTop: 12 }}>
                  {draft.map((w, i) => (
                    <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 9, padding: 12, marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontFamily: serif, fontStyle: "italic", fontSize: 14, color: C.p500 }}>{t.work(i + 1)}</span>
                        {draft.length > 1 && <button onClick={() => setDraft((d) => d.filter((_, j) => j !== i))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.removeWork}</button>}
                      </div>
                      <input style={{ ...input, marginBottom: 8 }} placeholder={t.composerLabel} value={w.composer} onChange={(e) => setD(i, "composer", e.target.value)} />
                      <textarea style={{ ...input, minHeight: 42, resize: "vertical", marginBottom: 4, fontFamily: sans }} placeholder={t.workLabel} value={w.text} onChange={(e) => setD(i, "text", e.target.value)} />
                      <div style={{ fontFamily: sans, fontSize: 11.5, color: C.grey, fontStyle: "italic", marginBottom: 8 }}>{t.repHint}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{t.duration}</span>
                        <input style={{ ...input, width: 60 }} type="number" min="0" placeholder="min" value={w.min} onChange={(e) => setD(i, "min", e.target.value)} />
                        <span style={{ fontFamily: serif, fontSize: 16, color: C.p500 }}>′</span>
                        <input style={{ ...input, width: 60 }} type="number" min="0" max="59" placeholder="sec" value={w.sec} onChange={(e) => setD(i, "sec", e.target.value)} />
                        <span style={{ fontFamily: serif, fontSize: 16, color: C.p500 }}>″</span>
                      </div>
                    </div>
                  ))}
                  <button style={{ ...btn("ghost"), marginBottom: 12 }} onClick={() => setDraft((d) => [...d, { composer: "", text: "", min: "", sec: "" }])}>{t.addWork}</button>
                  {editErr && <div style={{ fontFamily: sans, fontSize: 13, color: C.closed, marginBottom: 10 }}>{editErr}</div>}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ ...btn("ghost") }} onClick={() => { setEditing(null); setEditErr(""); }}>{t.confirmCancel}</button>
                    <button style={btn()} onClick={() => saveEdit(aid, reg)}>{t.saveEdits}</button>
                  </div>
                </div>
              )}

              {!isEd && (locked
                ? <div style={{ fontFamily: sans, fontSize: 12.5, color: C.closed, lineHeight: 1.5, marginTop: 8 }}>{t.cancelFrozen(fmtShort(a.date, lang))}</div>
                : <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button style={{ ...btn("ghost"), padding: "8px 14px", fontSize: 12 }} onClick={() => startEdit(reg)}>{t.editBtn}</button>
                    <button style={{ ...btn("danger"), padding: "8px 14px", fontSize: 12 }} onClick={() => { setConfirmDel({ aid, rid: reg.id }); setDelCode(""); setDelErr(""); }}>{t.unregister}</button>
                  </div>)}
            </div>
          );
        })}
    </Card>
  );
}

/* ───────────────────────── Espace accompagnateur·rice·s ──────────────────── */
function AccSpace({ t, lang, auditions, regs, accompanists, onValidate }) {
  const [code, setCode] = useState(""); const [err, setErr] = useState(""); const [me, setMe] = useState(null);
  if (!me) {
    const enter = () => { const f = accompanists.find((a) => a.code && a.code === code.trim()); if (f) { setErr(""); setMe(f.id); } else setErr(t.passWrong); };
    return (
      <Card className="fade">
        <div style={eyebrow}>{t.nav_acc}</div>
        <p style={{ fontFamily: sans, fontSize: 14, color: C.grey, margin: "6px 0 16px" }}>{t.accLead}</p>
        <Field label={t.passLabel}><input style={input} type="password" value={code} onChange={(e) => setCode(e.target.value)} /></Field>
        {err && <div style={{ fontFamily: sans, fontSize: 13.5, color: C.closed, marginBottom: 12 }}>{err}</div>}
        <button style={btn()} onClick={enter}>{t.enter}</button>
        <div style={{ fontFamily: sans, fontSize: 11.5, color: C.p300, marginTop: 12, fontStyle: "italic" }}>maquette : codes {accompanists.map((a) => a.code).filter(Boolean).join(", ")}</div>
      </Card>
    );
  }
  const meName = (accompanists.find((a) => a.id === me) || {}).name;
  const requests = [];
  auditions.forEach((a) => (regs[a.id] || []).forEach((r) => { if (r.accompanist) requests.push({ a, r }); }));

  return (
    <Card className="fade">
      <div style={eyebrow}>{t.nav_acc}</div>
      <div style={{ fontFamily: serif, fontSize: 18, color: C.ink, margin: "6px 0 2px" }}>{meName}</div>
      <p style={{ fontFamily: sans, fontSize: 14, color: C.grey, margin: "0 0 18px" }}>{t.accLead}</p>

      <div style={{ ...label, margin: "4px 0 10px" }}>{t.requests}</div>
      {requests.length === 0 ? <p style={{ fontFamily: sans, fontSize: 14, color: C.grey }}>{t.accNone}</p> :
        requests.map(({ a, r }, i) => (
          <div key={i} style={{ padding: "13px 0", borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
            <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 17, color: C.ink }}>{r.name}</div>
            <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, margin: "2px 0 6px" }}>{a.title} · {r.works.map((w) => (w.composer ? w.composer + ", " : "") + w.text).join(" / ")}</div>
            {r.score === "pdf" ? (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                {r.pdf && r.pdf.url
                  ? <a href={r.pdf.url} target="_blank" rel="noreferrer" style={{ ...btn("ghost"), padding: "8px 14px", fontSize: 12, textDecoration: "none", display: "inline-block" }}>{t.accView}</a>
                  : <span style={{ fontFamily: sans, fontSize: 12.5, color: C.p700, fontStyle: "italic" }}>{t.accPdf}{r.pdf ? ` — ${r.pdf.name}` : ""}</span>}
                {fmtPages(r.pages) && <span style={{ fontFamily: sans, fontSize: 12.5, color: C.p500 }}>{t.pagesShort} : {fmtPages(r.pages)}</span>}
              </div>
            ) : <span style={{ fontFamily: sans, fontSize: 12.5, color: C.p700, fontStyle: "italic" }}>{t.accPaper}</span>}
            <div style={{ marginTop: 8 }}>
              {r.validatedBy === me
                ? <span style={{ fontFamily: sans, fontSize: 12.5, color: C.ok }}>{t.validatedYou} · <button onClick={() => onValidate(a.id, r.id, null)} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5, padding: 0 }}>{t.undo}</button></span>
                : r.validatedBy
                  ? <span style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, fontStyle: "italic" }}>{t.takenBy((accompanists.find((x) => x.id === r.validatedBy) || {}).name)}</span>
                  : <button onClick={() => onValidate(a.id, r.id, me)} style={{ ...btn(), padding: "8px 14px", fontSize: 12 }}>{t.validate}</button>}
            </div>
          </div>
        ))}
    </Card>
  );
}

/* ───────────────────────────── Administration ───────────────────────────── */
/* ───────────────────────── Confirmation (anti-missclick) ─────────────────── */
function ConfirmDialog({ t, message, onYes, onNo }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(27,22,37,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 70 }}>
      <div className="fade" style={{ background: C.white, borderRadius: 14, padding: 24, maxWidth: 400, width: "100%" }}>
        <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 18, color: C.ink, marginBottom: 10 }}>{t.confirmTitle}</div>
        <p style={{ fontFamily: sans, fontSize: 14, color: C.grey, lineHeight: 1.6, margin: "0 0 20px" }}>{message}</p>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...btn("ghost"), flex: 1 }} onClick={onNo}>{t.confirmCancel}</button>
          <button style={{ ...btn("danger"), flex: 1 }} onClick={onYes}>{t.confirmYes}</button>
        </div>
      </div>
    </div>
  );
}

function Admin({ t, lang, auditions, regs, accompanists, penalized, codes, onSaveCode, onDeleteReg, onToggleNoShow, onCreate, onDelete, onAddAcc, onDelAcc }) {
  const [ok, setOk] = useState(false); const [pass, setPass] = useState(""); const [err, setErr] = useState("");
  const [title, setTitle] = useState(""); const [date, setDate] = useState(""); const [loc, setLoc] = useState(""); const [limit, setLimit] = useState("");
  const [accName, setAccName] = useState(""); const [accCode, setAccCode] = useState(""); const [sheet, setSheet] = useState(null);
  const [codeEdits, setCodeEdits] = useState({}); const [ncName, setNcName] = useState(""); const [ncVal, setNcVal] = useState("");
  const [confirm, setConfirm] = useState(null);
  const ask = (message, onYes) => setConfirm({ message, onYes });
  if (!ok) return <Gate t={t} title={t.nav_admin} onOk={() => setOk(true)} pass={pass} setPass={setPass} err={err} setErr={setErr} expected="AfterReadingDante" />;

  // Liste des personnes connues (inscriptions + codes déjà définis)
  const people = {};
  for (const aid of Object.keys(regs)) for (const r of (regs[aid] || [])) { const k = norm(firstOf(r.name)); if (!people[k]) people[k] = firstOf(r.name); }
  for (const k of Object.keys(codes)) if (!people[k]) people[k] = k;
  const peopleList = Object.entries(people).sort((a, b) => a[1].localeCompare(b[1]));

  function create() { if (!title.trim() || !date || !limit) return; onCreate({ id: "a" + Date.now(), title: title.trim(), date: new Date(date).toISOString(), location: loc.trim(), limit: Number(limit) }); setTitle(""); setDate(""); setLoc(""); setLimit(""); }
  return (
    <Card className="fade">
      {confirm && <ConfirmDialog t={t} message={confirm.message} onYes={() => { confirm.onYes(); setConfirm(null); }} onNo={() => setConfirm(null)} />}
      {sheet && <ProgrammeSheet t={t} lang={lang} audition={auditions.find((a) => a.id === sheet)} regs={regs[sheet] || []} accompanists={accompanists} onClose={() => setSheet(null)} />}
      <div style={eyebrow}>{t.nav_admin}</div>
      <p style={{ fontFamily: sans, fontSize: 14, color: C.grey, margin: "6px 0 18px" }}>{t.adminLead}</p>

      <div style={{ ...label, marginBottom: 10 }}>{t.newAudition}</div>
      <Field label={t.aTitle}><input style={input} value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <Field label={t.aDate}><input style={input} type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      <Field label={t.aLoc}><input style={input} value={loc} onChange={(e) => setLoc(e.target.value)} /></Field>
      <Field label={t.aLimit}><input style={input} type="number" min="1" value={limit} onChange={(e) => setLimit(e.target.value)} /></Field>
      <button style={btn()} onClick={create}>{t.create}</button>

      <div style={{ ...label, margin: "28px 0 10px" }}>{t.existing}</div>
      {[...auditions].sort((a, b) => new Date(a.date) - new Date(b.date)).map((a) => {
        const st = status(a, regs[a.id] || []);
        const printable = st.s === "frozen" || st.s === "past";
        return (
          <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "11px 0", borderTop: `1px solid ${C.line}` }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: serif, fontSize: 16, color: C.ink }}>{a.title}</div>
              <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>{fmtShort(a.date, lang)} · {a.limit} min · {t.performers((regs[a.id] || []).length)}</div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
              {printable && <button onClick={() => setSheet(a.id)} style={{ ...btn("ghost"), padding: "8px 12px", fontSize: 11.5 }}>{t.pdfBtn}</button>}
              <button onClick={() => ask(t.confirmDelAudition(a.title), () => onDelete(a.id))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.deleteA}</button>
            </div>
          </div>
        );
      })}

      <div style={{ ...label, margin: "28px 0 10px" }}>{t.accListLabel}</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <input style={{ ...input, flex: 2, minWidth: 140 }} placeholder={t.accNamePh} value={accName} onChange={(e) => setAccName(e.target.value)} />
        <input style={{ ...input, flex: 1, minWidth: 110 }} placeholder={t.passLabel} value={accCode} onChange={(e) => setAccCode(e.target.value)} />
        <button style={{ ...btn(), whiteSpace: "nowrap" }} onClick={() => { if (accName.trim() && accCode.trim()) { onAddAcc(accName.trim(), accCode.trim()); setAccName(""); setAccCode(""); } }}>{t.accAdd}</button>
      </div>
      {accompanists.map((a) => (
        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: `1px solid ${C.line}` }}>
          <span style={{ fontFamily: sans, fontSize: 14, color: C.ink }}>{a.name} <span style={{ color: C.p300, fontSize: 12.5 }}>· {a.code}</span></span>
          <button onClick={() => ask(t.confirmDelAcc(a.name), () => onDelAcc(a.id))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.deleteA}</button>
        </div>
      ))}

      <div style={{ ...label, margin: "28px 0 10px" }}>{t.absencesLabel}</div>
      {[...auditions].filter((a) => new Date(a.date).getTime() < now).sort((a, b) => new Date(b.date) - new Date(a.date)).map((a) => (
        <div key={a.id} style={{ marginBottom: 16, paddingTop: 4, borderTop: `1px solid ${C.line}` }}>
          <div style={{ fontFamily: serif, fontSize: 15, color: C.ink, margin: "8px 0 2px" }}>{a.title} <span style={{ fontFamily: sans, fontSize: 12, color: C.grey }}>· {fmtShort(a.date, lang)}</span></div>
          {(regs[a.id] || []).length === 0
            ? <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>—</div>
            : (regs[a.id] || []).map((r) => (
              <label key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", cursor: "pointer" }}>
                <input type="checkbox" checked={penalized.includes(norm(firstOf(r.name)))} onChange={() => onToggleNoShow(firstOf(r.name))} style={{ width: 17, height: 17, accentColor: C.closed }} />
                <span style={{ fontFamily: sans, fontSize: 13.5, color: penalized.includes(norm(firstOf(r.name))) ? C.closed : C.ink }}>{r.name} <span style={{ color: C.grey }}>— {t.noShow}</span></span>
              </label>
            ))}
        </div>
      ))}

      <div style={{ ...label, margin: "28px 0 10px" }}>{t.regsManageLabel}</div>
      <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, fontStyle: "italic", marginBottom: 10 }}>{t.regsManageHint}</div>
      {[...auditions].sort((a, b) => new Date(a.date) - new Date(b.date)).map((a) => (
        <div key={a.id} style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: serif, fontSize: 15, color: C.ink, margin: "6px 0 2px" }}>{a.title} <span style={{ fontFamily: sans, fontSize: 12, color: C.grey }}>· {fmtShort(a.date, lang)}</span></div>
          {(regs[a.id] || []).length === 0
            ? <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey }}>—</div>
            : (regs[a.id] || []).map((r) => (
              <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                <span style={{ fontFamily: sans, fontSize: 13.5, color: C.ink }}>{r.name}</span>
                <button onClick={() => ask(t.confirmDelReg(r.name), () => onDeleteReg(a.id, r.id))} style={{ border: "none", background: "none", color: C.closed, cursor: "pointer", fontFamily: sans, fontSize: 12.5 }}>{t.removeReg}</button>
              </div>
            ))}
        </div>
      ))}

      <div style={{ ...label, margin: "28px 0 10px" }}>{t.codesLabel}</div>
      <div style={{ fontFamily: sans, fontSize: 12.5, color: C.grey, fontStyle: "italic", marginBottom: 12 }}>{t.codesHint}</div>
      {peopleList.map(([k, d]) => {
        const val = codeEdits[k] ?? (codes[k] || "");
        return (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "8px 0", borderTop: `1px solid ${C.line}` }}>
            <span style={{ fontFamily: sans, fontSize: 13.5, color: C.ink, minWidth: 0 }}>{d} {!codes[k] && <span style={{ color: C.closed, fontSize: 12 }}>· {t.noCodeYet}</span>}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
              <input style={{ ...input, width: 92, letterSpacing: ".2em" }} inputMode="numeric" maxLength={4} value={val} onChange={(e) => setCodeEdits((s) => ({ ...s, [k]: e.target.value.replace(/\D/g, "") }))} />
              <button style={{ ...btn("ghost"), padding: "8px 12px", fontSize: 11.5, opacity: /^\d{4}$/.test(val) ? 1 : 0.4 }} onClick={() => { if (/^\d{4}$/.test(val)) ask(t.confirmSetCode(d), () => onSaveCode(d, val)); }}>{t.save}</button>
            </div>
          </div>
        );
      })}
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        <input style={{ ...input, flex: 2, minWidth: 140 }} placeholder={t.codeSetName} value={ncName} onChange={(e) => setNcName(e.target.value)} />
        <input style={{ ...input, flex: 1, minWidth: 90, letterSpacing: ".2em" }} inputMode="numeric" maxLength={4} placeholder="••••" value={ncVal} onChange={(e) => setNcVal(e.target.value.replace(/\D/g, ""))} />
        <button style={{ ...btn(), whiteSpace: "nowrap" }} onClick={() => { if (ncName.trim() && /^\d{4}$/.test(ncVal)) ask(t.confirmSetCode(ncName.trim()), () => { onSaveCode(ncName.trim(), ncVal); setNcName(""); setNcVal(""); }); }}>{t.codeSetBtn}</button>
      </div>
    </Card>
  );
}

/* ───────────────────────── Feuille de programme (PDF) ────────────────────── */
function ProgrammeSheet({ t, lang, audition, regs, accompanists, onClose }) {
  const accName = (id) => (accompanists.find((a) => a.id === id) || {}).name || "";
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(27,22,37,.55)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: 16, overflowY: "auto", zIndex: 60 }}>
      <div style={{ background: C.white, borderRadius: 12, maxWidth: 720, width: "100%", margin: "24px 0" }}>
        <div className="sheet" style={{ padding: 40 }}>
          {/* Logo HEMU — emplacement réservé, déposer le PNG officiel en production */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
            <div style={{ border: `1px dashed ${C.p300}`, borderRadius: 6, padding: "8px 14px", textAlign: "center", color: C.grey }}>
              <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 18, letterSpacing: ".06em", color: C.p700 }}>HE<span style={{ color: C.ink }}>MU</span></div>
              <div style={{ fontFamily: sans, fontSize: 7, letterSpacing: ".08em", marginTop: 1 }}>[ LOGO OFFICIEL ]</div>
            </div>
          </div>

          <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 21, color: C.ink, marginBottom: 14 }}>{t.sheetTitle(fmtDate(audition.date, lang))}</div>
          {audition.location && <div style={{ fontFamily: sans, fontSize: 14, color: C.ink, marginBottom: 3 }}>{t.salleLabel} : {audition.location}</div>}
          <div style={{ fontFamily: sans, fontSize: 14, color: C.ink }}>{t.scheduleLabel} : {fmtTime(audition.date, lang)}</div>

          <div style={{ borderTop: `1px solid ${C.ink}`, margin: "18px 0 6px" }} />

          {(regs || []).map((r) => (
            <div key={r.id} style={{ display: "grid", gridTemplateColumns: "0.95fr 1.5fr 1.1fr", columnGap: 18, rowGap: 2, alignItems: "start", padding: "16px 0", borderBottom: `1px solid ${C.line}` }}>
              {r.works.map((w, j) => (
                <React.Fragment key={j}>
                  <div style={{ fontFamily: sans, fontSize: 13.5, color: C.ink, lineHeight: 1.45 }}>{w.composer}</div>
                  <div style={{ fontFamily: sans, fontSize: 13.5, color: C.ink, lineHeight: 1.45 }}>
                    {w.text}<span style={{ color: C.grey, fontSize: 12 }}>  ·  {fmtDur(w.sec)}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 13.5, color: C.ink, lineHeight: 1.45 }}>
                    {j === 0 && (<>
                      <div>{r.name}</div>
                      {r.accompanist && <div style={{ color: C.p700 }}>piano : {r.validatedBy ? accName(r.validatedBy) : t.accToConfirm}</div>}
                    </>)}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
          {(regs || []).length === 0 && <div style={{ fontFamily: sans, fontSize: 13, color: C.grey, padding: "14px 0" }}>—</div>}
        </div>
        <div className="no-print" style={{ display: "flex", gap: 10, padding: "0 40px 28px" }}>
          <button style={btn()} onClick={() => window.print()}>{t.printBtn}</button>
          <button style={btn("ghost")} onClick={onClose}>{t.close}</button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Petits composants ────────────────────────── */
function Gate({ t, title, onOk, pass, setPass, err, setErr, expected }) {
  return (
    <Card className="fade">
      <div style={eyebrow}>{title}</div>
      <div style={{ marginTop: 14 }}>
        <Field label={t.passLabel}><input style={input} type="password" value={pass} onChange={(e) => setPass(e.target.value)} /></Field>
        {err && <div style={{ fontFamily: sans, fontSize: 13.5, color: C.closed, marginBottom: 12 }}>{err}</div>}
        <button style={btn()} onClick={() => (pass === expected ? onOk() : setErr(t.passWrong))}>{t.enter}</button>
      </div>
    </Card>
  );
}
function Card({ children, className }) { return <div className={className} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 22 }}>{children}</div>; }
function Field({ label: l, children }) { return <div style={{ marginBottom: 16 }}><label style={label}>{l}</label>{children}</div>; }
function Notice({ children }) { return <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 }}><p style={{ fontFamily: sans, fontSize: 14.5, color: C.grey, lineHeight: 1.6, margin: 0 }}>{children}</p></div>; }
