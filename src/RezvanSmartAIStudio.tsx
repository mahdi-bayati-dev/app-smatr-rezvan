import { useState, useRef, useCallback } from "react";
import type { ComponentType, KeyboardEvent } from "react";
import {
  Sparkles,
  FolderKanban,
  LayoutGrid,
  Settings,
  BookOpen,
  Camera as InstagramIcon,
  Send as TelegramIcon,
  Phone,
  Plus,
  Mic,
  CornerDownLeft,
  RotateCcw,
  ChevronDown,
  CheckCircle2,
  Terminal,
  Circle,
  Gauge,
} from "lucide-react";

import avatarPhoto from "./assets/persona/avatar.jpg";
import portraitPhoto from "./assets/persona/portrait.jpg";
import cafePhoto from "./assets/persona/cafe.jpg";
import bicyclePhoto from "./assets/persona/bicycle.jpg";

// ============================================================================
// منابع تصاویر
// ============================================================================

// عکس پروفایل پدرام محمدی (آواتار اصلی پرسونا - مرحله ۱)
const AVATAR_IMAGE_URL = avatarPhoto;

// عکس گالری مرحله ۲ (تصویر اداری/محل کار)
const GALLERY_STEP2_IMAGE_URL = portraitPhoto;

// تصاویر پست اینستاگرام مرحله ۳ (دو تصویر پرسنلی/محتوایی)
const GALLERY_STEP3_IMAGE_URL_1 = cafePhoto;
const GALLERY_STEP3_IMAGE_URL_2 = bicyclePhoto;

// ============================================================================
// دیتای ثابت پروژه (مقادیر نمایشی سایدبار)
// ============================================================================

const PROJECTS = [
  { name: "پرسونا پدرام محمدی", active: true },
  { name: "کمپین نوروز ۱۴۰۵", active: false },
  { name: "آواتار پشتیبانی VIP", active: false },
  { name: "تولید محتوای اینستاگرام", active: false },
];

const NAV_ITEMS = [
  { label: "Playground", icon: LayoutGrid },
  { label: "مدل‌های ذخیره‌شده", icon: FolderKanban },
  { label: "تنظیمات API", icon: Settings },
  { label: "مستندات", icon: BookOpen },
];

// وضعیت متن‌های خالی اولیه (Placeholder)
const EMPTY_PERSONA = {
  avatar: null as string | null,
  name: "",
  role: "",
  bio: "",
  instagram: "",
  telegram: "",
  rubika: "",
  phone: "",
};

type GalleryItem = { url: string; label: string; tag: string };
type Task = { title: string; status: string; code: string };

export default function RezvanSmartAIStudio() {
  const [demoStep, setDemoStep] = useState(0); // 0..3
  const [persona, setPersona] = useState(EMPTY_PERSONA);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completion, setCompletion] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [syncedMessage, setSyncedMessage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ----------------------------------------------------------------------
  // موتور مراحل دمو: اجرای هر مرحله با شبیه‌سازی لودینگ هوش مصنوعی
  // ----------------------------------------------------------------------
  const runStep = useCallback((targetStep: number) => {
    setIsThinking(true);
    setTimeout(() => {
      if (targetStep === 1) {
        setPersona((p) => ({
          ...p,
          avatar: AVATAR_IMAGE_URL,
          name: "پدرام محمدی",
          role: "مهندسی فناوری اطلاعات (IT Engineer)",
          bio: "متخصص ارشد زیرساخت و دواپس، علاقه‌مند به هوش مصنوعی و خودکارسازی فرآیندها.",
          phone: "۰۹۱۲۳۴۵۶۷۸۹",
        }));
        setCompletion(40);
      } else if (targetStep === 2) {
        setGallery((g) => [
          ...g,
          {
            url: GALLERY_STEP2_IMAGE_URL,
            label: "تصویر اداری/محل کار",
            tag: "پروفایل",
          },
        ]);
        setPersona((p) => ({ ...p, telegram: "@pedram_dev" }));
        setCompletion(70);
      } else if (targetStep === 3) {
        setPersona((p) => ({
          ...p,
          instagram: "@pedram.mohammadi_it",
          rubika: "@pedram_it",
        }));
        setGallery((g) => [
          ...g,
          {
            url: GALLERY_STEP3_IMAGE_URL_1,
            label: "پست اینستاگرام",
            tag: "پست اینستاگرام",
          },
          {
            url: GALLERY_STEP3_IMAGE_URL_2,
            label: "پست اینستاگرام",
            tag: "پست اینستاگرام",
          },
        ]);
        setTasks((t) => [
          ...t,
          {
            title: "Auto-Sync Social Channels",
            status: "COMPLETED",
            code: `# Task: Auto-Sync Social Channels
rezvan_agent.sync_channels(
    platforms=['instagram', 'telegram', 'rubika'],
    persona='pedram_mohammadi',
    schedule='daily_10am'
)
# Status: Active & Monitoring`,
          },
        ]);
        setCompletion(100);
        setSyncedMessage(true);
      }
      setDemoStep(targetStep);
      setIsThinking(false);
    }, 800);
  }, []);

  const handleSubmitPrompt = useCallback(() => {
    if (demoStep >= 3 || isThinking) return;
    const nextStep = demoStep + 1;
    runStep(nextStep);
    setInputValue("");
  }, [demoStep, isThinking, runStep]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitPrompt();
    }
  };

  const resetDemo = () => {
    setDemoStep(0);
    setPersona(EMPTY_PERSONA);
    setGallery([]);
    setTasks([]);
    setCompletion(0);
    setIsThinking(false);
    setInputValue("");
    setSyncedMessage(false);
  };

  return (
    <div
      dir="rtl"
      className="flex h-screen w-full overflow-hidden bg-[#0e0e11] text-slate-200 font-sans"
      style={{ fontFamily: "'Vazirmatn', 'IRANSans', system-ui, sans-serif" }}
    >
      {/* ================================================================ */}
      {/* سایدبار سمت راست (در RTL سمت راست صفحه قرار می‌گیرد)            */}
      {/* ================================================================ */}
      <aside className="flex w-72 flex-shrink-0 flex-col border-l border-[#2e3138] bg-[#131316] p-4">
        {/* لوگو */}
        <div className="mb-6 flex items-center gap-2 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4285F4] via-[#9B72CB] to-[#D96570] shadow-lg shadow-[#9B72CB]/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-[15px] font-bold text-slate-100">
            استودیو هوشمند رضوان
          </span>
        </div>

        {/* لیست پروژه‌ها */}
        <div className="mb-6">
          <p className="mb-2 px-2 text-xs font-medium text-slate-500">
            پروژه‌ها
          </p>
          <div className="flex flex-col gap-1">
            {PROJECTS.map((proj) => (
              <button
                key={proj.name}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-right text-sm transition-colors duration-150 ${
                  proj.active
                    ? "bg-[#282a30] text-slate-100"
                    : "text-slate-400 hover:bg-[#1e1f24] hover:text-slate-200"
                }`}
              >
                <Circle
                  className={`h-2 w-2 flex-shrink-0 ${
                    proj.active ? "fill-[#4285F4] text-[#4285F4]" : "fill-slate-600 text-slate-600"
                  }`}
                />
                <span className="truncate">
                  {proj.name}
                  {proj.active && (
                    <span className="mr-1 text-xs text-[#9B72CB]"> (فعال)</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ناوبری */}
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-right text-sm text-slate-400 transition-colors duration-150 hover:bg-[#1e1f24] hover:text-slate-200"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* نشان وضعیت موتور */}
        <div className="mt-auto flex items-center gap-2 rounded-xl border border-[#2e3138] bg-[#1e1f24] px-3 py-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs text-slate-400">
            Rezvan Engine v2.4 - آماده پردازش
          </span>
        </div>
      </aside>

      {/* ================================================================ */}
      {/* فضای اصلی کار                                                     */}
      {/* ================================================================ */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* هدر */}
        <header className="flex flex-shrink-0 items-center justify-between border-b border-[#2e3138] bg-[#131316]/80 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-slate-100">
              ساخت پرسونا هوشمند
              <span className="mr-2 text-sm font-normal text-slate-500">
                (Agent Persona Builder)
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* انتخابگر مدل */}
            <button className="flex items-center gap-2 rounded-full border border-[#2e3138] bg-[#1e1f24] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-[#9B72CB]/50">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#4285F4] to-[#9B72CB]" />
              Gemini 2.5 Pro / Rezvan LLM
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {/* دکمه ریست دمو */}
            <button
              onClick={resetDemo}
              title="Reset Demo"
              className="flex items-center gap-1.5 rounded-full border border-[#2e3138] bg-[#1e1f24] px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-[#D96570]/60 hover:text-[#D96570]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Demo
            </button>
          </div>
        </header>

        {/* بدنه اصلی (بدون اسکرول - کل محتوا در ۱۰۰vh جای می‌گیرد) */}
        <div className="grid flex-1 grid-rows-[auto_auto_auto_1fr] gap-3 overflow-hidden px-6 py-4">
          {/* پیام موفقیت همگام‌سازی (ارتفاع ثابت برای جلوگیری از جابجایی چیدمان) */}
          <div className="h-10">
            {syncedMessage && (
              <div className="animate-[fadeIn_0.4s_ease] flex h-10 items-center gap-3 rounded-xl border border-[#9B72CB]/40 bg-gradient-to-l from-emerald-500/10 via-[#9B72CB]/10 to-[#4285F4]/10 px-4">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                <span className="text-sm font-medium text-slate-100">
                  پرسونا با موفقیت همگام‌سازی شد
                </span>
              </div>
            )}
          </div>

          {/* متریک‌ها: درصد تکمیل + دقت AI */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#2e3138] bg-[#131316] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  تکمیل پرسونا (Profile Completion)
                </span>
                <span className="text-sm font-bold text-slate-100">
                  {completion}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#282a30]">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-[#4285F4] via-[#9B72CB] to-[#D96570] transition-all duration-700 ease-out"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-[#2e3138] bg-[#131316] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Gauge className="h-3.5 w-3.5" />
                  دقت تشخیص AI
                </span>
                <span className="text-sm font-bold text-slate-100">
                  {demoStep === 0 ? "—" : `${92 + demoStep * 2}%`}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#282a30]">
                <div
                  className="h-full rounded-full bg-emerald-500/70 transition-all duration-700 ease-out"
                  style={{ width: demoStep === 0 ? "0%" : `${92 + demoStep * 2}%` }}
                />
              </div>
            </div>
          </div>

          {/* کارت پروفایل + بیوگرافی + راه‌های ارتباطی */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
            {/* بخش پروفایل */}
            <div
              className={`rounded-xl border border-[#2e3138] bg-[#131316] p-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:col-span-1 ${
                persona.name
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <p className="mb-2 text-xs font-medium text-slate-500">
                پروفایل
              </p>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="relative">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[#2e3138] bg-[#1e1f24]">
                    {persona.avatar && (
                      <img
                        src={persona.avatar}
                        alt="آواتار پرسونا"
                        className="h-full w-full animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)] object-cover"
                      />
                    )}
                  </div>
                  {persona.avatar && (
                    <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full border-2 border-[#131316] bg-emerald-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">
                    {persona.name}
                  </p>
                  <p className="text-xs text-slate-400">{persona.role}</p>
                </div>
              </div>
            </div>

            {/* بیوگرافی */}
            <div
              className={`flex flex-col rounded-xl border border-[#2e3138] bg-[#131316] p-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] lg:col-span-2 ${
                persona.bio
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <p className="mb-2 text-xs font-medium text-slate-500">
                بیوگرافی (Bio)
              </p>
              <div className="flex-1 overflow-hidden rounded-lg border border-[#2e3138] bg-[#0e0e11] p-3 font-mono text-[12.5px] leading-relaxed text-slate-300 transition-colors focus-within:border-[#4285F4]/50">
                {persona.bio}
              </div>
            </div>

            {/* راه‌های ارتباطی */}
            <div className="grid grid-cols-2 gap-3 lg:col-span-2">
              <ContactCard
                icon={InstagramIcon}
                label="اینستاگرام"
                value={persona.instagram}
                gradient="from-[#D96570] to-[#9B72CB]"
              />
              <ContactCard
                icon={TelegramIcon}
                label="تلگرام"
                value={persona.telegram}
                gradient="from-[#4285F4] to-[#2b6fe0]"
              />
              <ContactCard
                icon={RubikaBadge}
                label="روبیکا"
                value={persona.rubika}
                gradient="from-[#9B72CB] to-[#6a4a9b]"
                isCustomIcon
              />
              <ContactCard
                icon={Phone}
                label="شماره تماس"
                value={persona.phone}
                gradient="from-emerald-500 to-emerald-700"
              />
            </div>
          </div>

          {/* تسک‌ها و گالری (ردیف انتهایی، فضای باقیمانده را پر می‌کند) */}
          <div className="grid min-h-0 grid-cols-1 gap-3 lg:grid-cols-2">
            {/* تسک‌ها و اسکریپت‌های اجرایی */}
            <div
              className={`flex min-h-0 flex-col rounded-xl border border-[#2e3138] bg-[#131316] p-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                tasks.length > 0
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <p className="mb-2 flex flex-shrink-0 items-center gap-2 text-xs font-medium text-slate-500">
                <Terminal className="h-3.5 w-3.5" />
                تسک‌ها و اسکریپت‌های اجرایی
              </p>
              <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-[#2e3138] bg-[#0a0a0c] p-3 font-mono text-[12px]">
                <div className="mb-2 flex items-center gap-1.5 border-b border-[#2e3138] pb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D96570]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="mr-2 text-[11px] text-slate-500">
                    rezvan_agent_runner.py
                  </span>
                </div>
                {tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">{task.title}</span>
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        {task.status}
                      </span>
                    </div>
                    <pre
                      dir="ltr"
                      className="overflow-x-auto whitespace-pre-wrap text-left text-emerald-300/90"
                    >
{task.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* گالری اختصاصی */}
            <div
              className={`flex min-h-0 flex-col rounded-xl border border-[#2e3138] bg-[#131316] p-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                gallery.length > 0
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <p className="mb-2 flex-shrink-0 text-xs font-medium text-slate-500">
                گالری اختصاصی پرسونا
              </p>
              <div className="grid min-h-0 flex-1 grid-cols-4 gap-2 overflow-hidden">
                {gallery.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden rounded-lg border border-[#2e3138]"
                  >
                    <img
                      src={item.url}
                      alt={item.label}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-slate-200 backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* نوار پرامپت پایین صفحه                                       */}
        {/* ============================================================ */}
        <div className="flex-shrink-0 border-t border-[#2e3138] bg-[#131316]/90 px-6 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl">
            {/* کپسول ورودی */}
            <div className="relative rounded-2xl p-[2px]">
              {isThinking && (
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #4285F4, #9B72CB, #D96570, #4285F4)",
                    animation:
                      "spinBorder 3s linear infinite, pulseGlow 3s ease-in-out infinite",
                  }}
                />
              )}
              <div className="relative flex items-center gap-2 rounded-[14px] border border-[#2e3138] bg-[#1e1f24] px-3 py-2 shadow-lg shadow-black/20 transition-all duration-200 focus-within:border-[#9B72CB] focus-within:shadow-[#9B72CB]/10">
                <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-[#282a30] hover:text-slate-200">
                  <Plus className="h-4 w-4" />
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={isThinking ? "" : inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isThinking || demoStep >= 3}
                  placeholder={
                    isThinking
                      ? "در حال پردازش توسط هوش مصنوعی..."
                      : demoStep >= 3
                      ? "پرسونا تکمیل شد — برای شروع دوباره Reset Demo را بزنید"
                      : "دستور بعدی را بنویسید یا از چیپ‌های بالا استفاده کنید..."
                  }
                  className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed"
                />

                {isThinking && <ThinkingDots />}

                <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-[#282a30] hover:text-slate-200">
                  <Mic className="h-4 w-4" />
                </button>

                <button
                  onClick={handleSubmitPrompt}
                  disabled={isThinking || demoStep >= 3}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#9B72CB] to-[#D96570] text-white transition-transform duration-150 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* کی‌فریم‌های سراسری */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.85) translateY(6px); }
          60% { opacity: 1; transform: scale(1.04) translateY(-1px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spinBorder {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(155, 114, 203, 0); }
          50% { box-shadow: 0 0 18px 2px rgba(155, 114, 203, 0.35); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ============================================================================
// نشانگر لودینگ سه‌نقطه‌ای هنگام پردازش هوش مصنوعی
// ============================================================================
function ThinkingDots() {
  return (
    <span className="flex flex-shrink-0 items-center gap-1 px-0.5">
      <span className="h-1.5 w-1.5 animate-[dotBounce_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[#4285F4] to-[#9B72CB]" />
      <span className="h-1.5 w-1.5 animate-[dotBounce_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[#9B72CB] to-[#D96570] [animation-delay:0.15s]" />
      <span className="h-1.5 w-1.5 animate-[dotBounce_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-[#D96570] to-[#4285F4] [animation-delay:0.3s]" />
    </span>
  );
}

// ============================================================================
// کارت ارتباطی (اینستاگرام / تلگرام / روبیکا / تلفن)
// ============================================================================
type ContactCardProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  gradient: string;
  isCustomIcon?: boolean;
};

function ContactCard({ icon: Icon, label, value, gradient, isCustomIcon }: ContactCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#2e3138] bg-[#131316] p-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#3a3d45] ${
        value
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <div
        className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}
      >
        {isCustomIcon ? (
          <Icon />
        ) : (
          <Icon className="h-4 w-4 text-white" />
        )}
      </div>
      <p className="mb-1 text-xs text-slate-500">{label}</p>
      <p className="truncate text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}

// نشان اختصاصی روبیکا (آیکون آن در lucide-react موجود نیست)
function RubikaBadge() {
  return (
    <span className="text-[11px] font-black leading-none text-white">R</span>
  );
}
