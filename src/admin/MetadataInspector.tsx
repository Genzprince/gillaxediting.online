import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Globe, Search, Copy, Check, RefreshCw, Code, Eye,
  Tag, AlertCircle, CheckCircle2, ExternalLink, ShieldCheck,
  Share2, Layers, Sparkles, HelpCircle
} from "lucide-react";

interface MetaItem {
  type: "title" | "meta-name" | "meta-property" | "link-canonical" | "meta-other";
  key: string;
  value: string;
  rawHtml: string;
  status: "ok" | "warning" | "missing";
  note?: string;
}

export default function MetadataInspector() {
  const [items, setItems] = useState<MetaItem[]>([]);
  const [docTitle, setDocTitle] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lastScannedTime, setLastScannedTime] = useState<string>("");
  const [activeSubTab, setActiveSubTab] = useState<"all" | "primary" | "og" | "twitter" | "preview">("all");

  const scanDomHead = () => {
    if (typeof document === "undefined") return;

    const scannedItems: MetaItem[] = [];
    const currentTitle = document.title || "";
    setDocTitle(currentTitle);

    // Title Tag
    const titleLen = currentTitle.length;
    scannedItems.push({
      type: "title",
      key: "<title>",
      value: currentTitle,
      rawHtml: `<title>${currentTitle}</title>`,
      status: titleLen >= 30 && titleLen <= 65 ? "ok" : "warning",
      note: titleLen === 0 ? "Missing title tag" : `${titleLen} chars (Recommended: 30-65 chars)`
    });

    // Canonical Link
    const canonicalEl = document.querySelector<HTMLLinkElement>("head link[rel='canonical']");
    const canonicalHref = canonicalEl ? canonicalEl.href : "";
    setCanonicalUrl(canonicalHref);
    scannedItems.push({
      type: "link-canonical",
      key: 'link[rel="canonical"]',
      value: canonicalHref || "Not defined",
      rawHtml: canonicalEl ? canonicalEl.outerHTML : '<link rel="canonical" href="..." />',
      status: canonicalHref ? "ok" : "warning",
      note: canonicalHref ? "Canonical URL active" : "Recommended to prevent duplicate content indexing"
    });

    // Meta Tags
    const metaNodes = Array.from(document.querySelectorAll<HTMLMetaElement>("head meta"));

    metaNodes.forEach((meta) => {
      const name = meta.getAttribute("name");
      const property = meta.getAttribute("property");
      const content = meta.getAttribute("content") || "";
      const charset = meta.getAttribute("charset");
      const httpEquiv = meta.getAttribute("http-equiv");

      if (charset) {
        scannedItems.push({
          type: "meta-other",
          key: "charset",
          value: charset,
          rawHtml: meta.outerHTML,
          status: "ok",
          note: "Character Encoding"
        });
        return;
      }

      if (httpEquiv) {
        scannedItems.push({
          type: "meta-other",
          key: `http-equiv="${httpEquiv}"`,
          value: content,
          rawHtml: meta.outerHTML,
          status: "ok"
        });
        return;
      }

      if (name) {
        let status: "ok" | "warning" | "missing" = "ok";
        let note = "Standard Meta Tag";

        if (name === "description") {
          const descLen = content.length;
          status = descLen >= 50 && descLen <= 160 ? "ok" : "warning";
          note = descLen === 0 ? "Missing description" : `${descLen} chars (Recommended: 120-160 chars)`;
        } else if (name === "viewport") {
          status = "ok";
          note = "Mobile Viewport Configuration";
        }

        scannedItems.push({
          type: "meta-name",
          key: `name="${name}"`,
          value: content,
          rawHtml: meta.outerHTML,
          status,
          note
        });
      } else if (property) {
        let note = "Social / Open Graph Tag";
        if (property.startsWith("og:")) {
          note = "Open Graph Protocol";
        }

        scannedItems.push({
          type: "meta-property",
          key: `property="${property}"`,
          value: content,
          rawHtml: meta.outerHTML,
          status: content ? "ok" : "warning",
          note
        });
      }
    });

    setItems(scannedItems);
    setLastScannedTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    scanDomHead();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Helper getters
  const getItemValue = (keyPattern: string) => {
    const item = items.find((i) => i.key.includes(keyPattern));
    return item ? item.value : "";
  };

  const metaDesc = getItemValue("name=\"description\"");
  const ogTitle = getItemValue("og:title") || docTitle;
  const ogDesc = getItemValue("og:description") || metaDesc;
  const ogUrl = getItemValue("og:url") || canonicalUrl || "https://gillaxediting.online";
  const twitterTitle = getItemValue("twitter:title") || ogTitle;
  const twitterDesc = getItemValue("twitter:description") || ogDesc;
  const twitterCard = getItemValue("twitter:card") || "summary_large_image";

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeSubTab === "primary") {
      return item.type === "title" || item.key.includes("description") || item.key.includes("canonical") || item.key.includes("viewport") || item.type === "meta-name";
    }
    if (activeSubTab === "og") {
      return item.key.includes("og:");
    }
    if (activeSubTab === "twitter") {
      return item.key.includes("twitter:");
    }
    return true;
  });

  const generateFullHeadCode = () => {
    return items.map((i) => `    ${i.rawHtml}`).join("\n");
  };

  return (
    <div className="flex flex-col gap-6 text-white font-sans selection:bg-[#7C6F9F]/30 selection:text-[#B8AECF]">
      
      {/* Top Banner & Control Bar */}
      <div className="bg-[#121316] border border-white/[0.06] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-[#7C6F9F]/15 border border-[#7C6F9F]/30 rounded-xl text-[#B8AECF]">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black tracking-wider uppercase font-sans text-white">
                BROWSER HEAD METADATA INSPECTOR
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-bold uppercase">
                LIVE DOM ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#8A919E] font-mono mt-0.5">
              Live debugging viewer inspecting <code className="text-neutral-300">document.head</code> tags rendered in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {lastScannedTime && (
            <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
              LAST SCANNED: {lastScannedTime}
            </span>
          )}
          <button
            onClick={scanDomHead}
            className="inline-flex items-center space-x-2 bg-[#7C6F9F] hover:bg-[#8A7BB3] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs tracking-widest uppercase transition-all shadow-lg hover:shadow-[#7C6F9F]/10 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-black stroke-[2.5px]" />
            <span>RE-SCAN HEAD DOM</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex flex-wrap items-center gap-1.5 bg-white/[0.03] border border-white/[0.06] p-1 rounded-xl">
          {[
            { id: "all", label: "All Head Tags", icon: Layers, count: items.length },
            { id: "primary", label: "Search & Title", icon: Tag, count: items.filter(i => i.type === "title" || i.key.includes("description") || i.key.includes("canonical")).length },
            { id: "og", label: "Open Graph (FB/WA)", icon: Share2, count: items.filter(i => i.key.includes("og:")).length },
            { id: "twitter", label: "Twitter / X Cards", icon: Sparkles, count: items.filter(i => i.key.includes("twitter:")).length },
            { id: "preview", label: "Live Snippet Simulators", icon: Eye, count: 2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#7C6F9F] text-black font-extrabold shadow-sm"
                    : "text-[#8A919E] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-black font-bold" : "bg-neutral-800 text-neutral-400"}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {activeSubTab !== "preview" && (
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tag or content..."
              className="w-full bg-[#121316] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono placeholder-neutral-600 focus:outline-none focus:border-[#7C6F9F] transition-all"
            />
          </div>
        )}
      </div>

      {/* Main Tab Rendering */}
      {activeSubTab === "preview" ? (
        /* SIMULATORS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 1. Google Search Engine Simulator */}
          <div className="bg-[#121316] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
                  Google Search Result Preview
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">SERP Simulator</span>
            </div>

            {/* Google Search Card Box */}
            <div className="bg-white p-5 rounded-xl text-left font-sans space-y-1 shadow-md border border-neutral-200">
              <div className="flex items-center space-x-2 text-xs text-[#202124] mb-1">
                <span className="w-4 h-4 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-bold text-neutral-700">
                  G
                </span>
                <span className="text-[12px] text-[#202124] truncate">{canonicalUrl || "https://gillaxediting.online"}</span>
                <span className="text-neutral-400">›</span>
              </div>
              <h3 className="text-[18px] text-[#1a0dab] font-normal hover:underline cursor-pointer leading-snug line-clamp-1">
                {docTitle || "Gillaxediting | Video Editing & Motion Design"}
              </h3>
              <p className="text-[13px] text-[#4d5156] leading-relaxed line-clamp-2 pt-0.5">
                {metaDesc || "We help creators and brands bring their ideas to life through thoughtful editing, motion design, and visual storytelling."}
              </p>
            </div>

            <div className="bg-[#0B0C0E] p-4 rounded-xl border border-white/[0.04] space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>Title Length:</span>
                <span className={docTitle.length >= 30 && docTitle.length <= 65 ? "text-emerald-400 font-bold" : "text-amber-400"}>
                  {docTitle.length} characters (Ideal: 30-65)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Description Length:</span>
                <span className={metaDesc.length >= 50 && metaDesc.length <= 160 ? "text-emerald-400 font-bold" : "text-amber-400"}>
                  {metaDesc.length} characters (Ideal: 120-160)
                </span>
              </div>
            </div>
          </div>

          {/* 2. Social Media Sharing Card Simulator (Open Graph & X) */}
          <div className="bg-[#121316] border border-white/[0.06] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-[#B8AECF]" />
                <h3 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
                  Social Card Preview (WhatsApp / Discord / X / LinkedIn)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Open Graph</span>
            </div>

            {/* Social Card Visual Mockup */}
            <div className="bg-[#1C1E24] rounded-2xl overflow-hidden border border-white/10 shadow-xl text-left">
              <div className="aspect-[1.91/1] w-full bg-neutral-900 relative flex items-center justify-center border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-neutral-900 to-neutral-950" />
                <div className="relative text-center p-6 space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-[#7C6F9F]/20 border border-[#7C6F9F]/40 flex items-center justify-center text-[#B8AECF] font-black text-xl">
                    G
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
                    Gillaxediting Creative Studio
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-1.5 bg-[#15171C]">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  {new URL(ogUrl).hostname.toUpperCase()}
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-1 leading-snug">
                  {ogTitle}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {ogDesc}
                </p>
              </div>
            </div>

            <div className="bg-[#0B0C0E] p-4 rounded-xl border border-white/[0.04] space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>og:title:</span>
                <span className="text-neutral-200 truncate max-w-[200px]">{ogTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>og:url:</span>
                <span className="text-neutral-200 truncate max-w-[200px]">{ogUrl}</span>
              </div>
              <div className="flex justify-between">
                <span>twitter:card:</span>
                <span className="text-emerald-400 font-bold">{twitterCard}</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* TAG LISTING VIEW */
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {filteredItems.map((item, index) => {
              const itemKeyId = `meta-${index}-${item.key}`;
              const isCopied = copiedKey === itemKeyId;

              return (
                <motion.div
                  key={itemKeyId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-[#121316] border border-white/[0.06] hover:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                >
                  {/* Left Metadata Tag Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      <span className="font-mono text-xs font-bold text-[#B8AECF] bg-[#7C6F9F]/15 border border-[#7C6F9F]/30 px-2.5 py-0.5 rounded-lg">
                        {item.key}
                      </span>
                      
                      {item.status === "ok" ? (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>VALID</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          <AlertCircle className="w-3 h-3" />
                          <span>ATTENTION</span>
                        </span>
                      )}

                      {item.note && (
                        <span className="text-[10px] font-mono text-neutral-500">
                          • {item.note}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-sm text-neutral-200 break-all bg-[#0B0C0E] border border-white/[0.04] p-2.5 rounded-xl leading-relaxed">
                      {item.value || <span className="text-neutral-600 italic">Empty or self-closing tag</span>}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleCopy(item.rawHtml, itemKeyId)}
                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                      title="Copy exact raw HTML tag"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY TAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="py-16 border border-dashed border-white/10 rounded-2xl text-center space-y-2">
                <Search className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  No matching metadata tags found
                </p>
              </div>
            )}
          </div>

          {/* Raw Generated Head Output Code Block */}
          <div className="bg-[#121316] border border-white/[0.06] rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-[#7C6F9F]" />
                <h3 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
                  Raw Rendered HTML Head Source Code
                </h3>
              </div>
              <button
                onClick={() => handleCopy(generateFullHeadCode(), "full-head-code")}
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#B8AECF] hover:text-white bg-[#7C6F9F]/15 border border-[#7C6F9F]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
              >
                {copiedKey === "full-head-code" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED HEAD HTML</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY ALL HEAD TAGS</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-[#0B0C0E] border border-white/[0.05] p-4 rounded-xl text-xs font-mono text-emerald-400/90 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-72">
              {generateFullHeadCode()}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}
