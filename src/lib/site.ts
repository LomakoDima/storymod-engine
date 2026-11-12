export const SITE = {
  name: "StoryModEngine",
  mcVersion: "Minecraft Java Edition 1.20.1",
  // Replace with the real repository URL.
  github: "https://github.com/",
};
export const NAV = [
  { to: "/features", label: "Features" },
  { to: "/docs", label: "Docs" },
  { to: "/download", label: "Download" },
  { to: "/changelog", label: "Changelog" },
] as const;
export const TOOLS = [
  { key: "level", name: "Level Editor", desc: "Build and arrange the spaces your story takes place in, directly inside the game." },
  { key: "npc", name: "NPC Editor", desc: "Create characters and define how they appear and behave in your content." },
  { key: "vfx", name: "VFX Editor", desc: "Design visual effects that bring scenes and moments to life." },
  { key: "sme", name: "SME Scripting", desc: "Tie everything together with the engine's own scripting language." },
];
