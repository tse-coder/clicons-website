"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Tick, GithubLogo } from "clicons-react";
import DocsTOC from "@/components/docsTOC";

export default function CliconsDocs() {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative bg-slate-950 rounded-lg p-4 my-4">
      <pre className="text-sm text-slate-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        {copied === id ? (
          <Tick size={16} className="text-green-400" />
        ) : (
          <Copy size={16} className="text-slate-400" />
        )}
      </button>
    </div>
  );

  const headings = [
    { id: "features", text: "Features" },
    { id: "installation", text: "Installation" },
    { id: "quickstart", text: "Quick Start" },
    { id: "importing-icons", text: "Importing Icons" },
    { id: "global-defaults", text: "Global Defaults" },
    { id: "props", text: "Icon Props" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <DocsTOC headings={headings} />
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Clicons React</h1>
          <p className="text-xl text-muted-foreground mb-6">
            A refactored, clean React icon library with ≈4500 individual
            components. Built from the MIT-licensed HugeIcons free icon set.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="default">
              <a
                href="https://github.com/Trikooo/clicons"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={20} />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <Card className="p-6 mb-8" id="features">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              • <strong>≈4500 React components</strong> – each icon is its own
              component for optimal tree-shaking
            </li>
            <li>
              • <strong>Customizable</strong> – size, color, and stroke width
              per component
            </li>
            <li>
              • <strong>Lightweight</strong> – only imports the icons you use
            </li>
            <li>
              • <strong>Fast</strong> – direct SVG rendering, no wrapper
              overhead
            </li>
            <li>
              • <strong>TypeScript</strong> – full TypeScript support
            </li>
            <li>
              • <strong>Tree-shakeable</strong> – unused icons are removed from
              your bundle
            </li>
          </ul>
        </Card>

        {/* Installation */}
        <section className="mb-12" id="installation">
          <h2 className="text-3xl font-bold mb-4">Installation</h2>
          <Tabs defaultValue="npm" className="w-full">
            <TabsList>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code="npm install clicons-react" id="npm" />
            </TabsContent>
            <TabsContent value="yarn">
              <CodeBlock code="yarn add clicons-react" id="yarn" />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code="pnpm add clicons-react" id="pnpm" />
            </TabsContent>
          </Tabs>
        </section>

        {/* Quick Start */}
        <section className="mb-12" id="quickstart">
          <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
          <CodeBlock
            code={`import { Loader, SearchIcon } from "clicons-react";

function App() {
  return (
    <div>
      <Loader size={24} color="blue" />
      <SearchIcon size={32} strokeWidth={2} />
    </div>
  );
}`}
            id="quickstart"
          />
        </section>

        {/* Importing Icons */}
        <section className="mb-12" id="importing-icons">
          <h2 className="text-3xl font-bold mb-4">Importing Icons</h2>
          <p className="text-muted-foreground mb-4">
            Each icon can be imported either with or without the{" "}
            <code className="bg-slate-800 px-2 py-1 rounded">Icon</code> suffix.
            Both imports refer to the same component.
          </p>
          <CodeBlock
            code={`import { HeartIcon, Heart } from "clicons-react";

export default function Example() {
  return (
    <div>
      {/* Using with Icon suffix */}
      <HeartIcon size={24} color="red" />

      {/* Using without Icon suffix */}
      <Heart size={32} color="pink" />
    </div>
  );
}`}
            id="importing"
          />
          <p className="text-muted-foreground mt-4">
            This works for all icons. The{" "}
            <code className="bg-slate-800 px-2 py-1 rounded">Icon</code> suffix
            is optional.
          </p>
        </section>

        {/* Global Defaults */}
        <section className="mb-12" id="global-defaults">
          <h2 className="text-3xl font-bold mb-4">
            Global Defaults with Config
          </h2>
          <p className="text-muted-foreground mb-4">
            Define global defaults (size, stroke width, color, etc.) using a
            config file at the project root:
          </p>
          <CodeBlock
            code={`// clicons.config.ts
export default {
  defaultSize: 24,
  defaultStrokeWidth: 1.5,
  defaultAbsoluteStrokeWidth: false,
  defaultColor: "currentColor",
};`}
            id="config"
          />
          <Card className="p-4 bg-amber-50 border-amber-200 mt-4">
            <p className="text-sm text-amber-900">
              <strong>Important:</strong> To make this config work, configure
              path resolution in your{" "}
              <code className="bg-amber-100 px-2 py-1 rounded">
                tsconfig.json
              </code>{" "}
              or{" "}
              <code className="bg-amber-100 px-2 py-1 rounded">
                jsconfig.json
              </code>
              :
            </p>
          </Card>
          <CodeBlock
            code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "clicons.config": ["./clicons.config.ts"]
    }
  }
}`}
            id="tsconfig"
          />
        </section>

        {/* Props Table */}
        <section className="mb-12" id="props">
          <h2 className="text-3xl font-bold mb-4">Icon Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Prop</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Default</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      size
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">number</td>
                  <td className="p-3 text-muted-foreground">16</td>
                  <td className="p-3 text-muted-foreground">
                    Icon size in pixels
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      color
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">currentColor</td>
                  <td className="p-3 text-muted-foreground">Icon color</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      strokeWidth
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">number</td>
                  <td className="p-3 text-muted-foreground">1.8</td>
                  <td className="p-3 text-muted-foreground">
                    Width of strokes
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      absoluteStrokeWidth
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">boolean</td>
                  <td className="p-3 text-muted-foreground">false</td>
                  <td className="p-3 text-muted-foreground">
                    Ignore scaling for stroke width
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      className
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">string</td>
                  <td className="p-3 text-muted-foreground">-</td>
                  <td className="p-3 text-muted-foreground">
                    Additional CSS classes
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      ref
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    React.Ref&lt;SVGSVGElement&gt;
                  </td>
                  <td className="p-3 text-muted-foreground">-</td>
                  <td className="p-3 text-muted-foreground">
                    Forward ref for SVG element
                  </td>
                </tr>
                <tr>
                  <td className="p-3">
                    <code className="bg-slate-600 px-2 py-1 rounded text-sm">
                      ...rest
                    </code>
                  </td>
                  <td className="p-3 text-muted-foreground">SVGAttributes</td>
                  <td className="p-3 text-muted-foreground">-</td>
                  <td className="p-3 text-muted-foreground">
                    Standard SVG attributes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12" id="examples">
          <h2 className="text-3xl font-bold mb-4">Examples</h2>

          <h3 className="text-xl font-semibold mb-3">Basic Usage</h3>
          <CodeBlock
            code={`import { HeartIcon, StarIcon } from "clicons-react";

export default function IconsExample() {
  return (
    <div>
      <HeartIcon size={24} color="red" />
      <StarIcon size={32} color="gold" strokeWidth={2} />
    </div>
  );
}`}
            id="example1"
          />

          <h3 className="text-xl font-semibold mb-3 mt-8">In a Button</h3>
          <CodeBlock
            code={`import { DownloadIcon } from "clicons-react";

export default function DownloadButton() {
  return (
    <button onClick={() => console.log("Downloading...")}>
      <DownloadIcon size={20} color="white" />
      Download
    </button>
  );
}`}
            id="example2"
          />

          <h3 className="text-xl font-semibold mb-3 mt-8">With Ref</h3>
          <CodeBlock
            code={`import { SearchIcon } from "clicons-react";
import { useRef } from "react";

export default function SearchBar() {
  const iconRef = useRef<SVGSVGElement>(null);

  return (
    <div>
      <input type="text" placeholder="Search..." />
      <SearchIcon ref={iconRef} size={20} />
    </div>
  );
}`}
            id="example3"
          />
        </section>

        {/* License */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">License</h2>
          <p className="text-muted-foreground">
            MIT - Based on HugeIcons free icons (MIT licensed)
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 mt-12 text-center text-muted-foreground">
          <p>
            Contributions can be submitted as pull requests to the{" "}
            <a
              href="https://github.com/Trikooo/clicons"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              clicons repository
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
