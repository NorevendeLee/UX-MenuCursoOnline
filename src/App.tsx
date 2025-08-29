import React, { useState } from "react";
import "./App.css";

type MenuItem = {
  id: string;
  title: string;
  children?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    id: "programacao",
    title: "Programação",
    children: [
      {
        id: "frontend",
        title: "Front-end",
        children: [{ id: "react", title: "React" }]
      },
      {
        id: "backend",
        title: "Back-end",
        children: [
          { id: "node", title: "Node" },
          { id: "python", title: "Python + Django" }
        ]
      }
    ]
  },
  {
    id: "design",
    title: "Design",
    children: [
      {
        id: "ux",
        title: "UX",
        children: [{ id: "prototipagem", title: "Prototipagem" }]
      }
    ]
  },
  {
    id: "jogos",
    title: "Desenvolvimento de Jogos",
    children: [{ id: "unity", title: "Unity" }, { id: "unreal", title: "Unreal" }]
  },
  {
    id: "banco",
    title: "Banco de Dados",
    children: [{ id: "mysql", title: "MySQL" }, { id: "mongodb", title: "MongoDB" }]
  }
];

function MenuNode({
  item,
  openItem,
  setOpenItem,
  onSelect,
  selected,
  depth = 0
}: {
  item: MenuItem;
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
  onSelect: (t: string) => void;
  selected: string;
  depth?: number;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const hasChildren = !!item.children && item.children.length > 0;
  const isOpen = depth === 0 ? openItem === item.id : localOpen;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item.title); // seleciona item
    if (hasChildren) {
      if (depth === 0) {
        setOpenItem(isOpen ? null : item.id); // acordeão principal
      } else {
        setLocalOpen(!localOpen); // submenu interno abre/fecha
      }
    }
  };

  return (
    <li className="menu-node">
      <button
        className={`menu-btn ${hasChildren ? "parent" : "leaf"} ${
          isOpen ? "open" : ""
        } ${selected === item.title ? "selected" : ""}`}
        onClick={handleClick}
        style={{ paddingLeft: 12 + depth * 12 }}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        <span className="menu-title">{item.title}</span>
        {hasChildren && <span className="chev">{isOpen ? "▲" : "▼"}</span>}
      </button>

      {hasChildren && (
        <div className={`submenu ${isOpen ? "open" : ""}`}>
          <ul>
            {item.children!.map((child) => (
              <MenuNode
                key={child.id}
                item={child}
                openItem={openItem}
                setOpenItem={setOpenItem}
                onSelect={onSelect}
                selected={selected}
                depth={depth + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function App() {
  const [selected, setSelected] = useState<string>("Selecione uma opção");
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand"></div>
        <nav>
          <ul className="menu-root">
            {menu.map((m) => (
              <MenuNode
                key={m.id}
                item={m}
                openItem={openItem}
                setOpenItem={setOpenItem}
                onSelect={(t) => setSelected(t)}
                selected={selected}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <main className="content">
        <h1>{selected}</h1>
        <p>Conteúdo relacionado aparecerá aqui quando você selecionar uma opção.</p>
      </main>
    </div>
  );
}
