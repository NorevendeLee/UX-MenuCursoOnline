import React, { useState } from "react";
import "./App.css";
import { FaReact, FaNodeJs, FaPython, FaDesktop, FaCog, FaUserAlt, FaDraftingCompass } from "react-icons/fa";
import { SiUnity, SiUnrealengine, SiMongodb } from "react-icons/si";
import { GrMysql } from "react-icons/gr";

type MenuItem = {
  id: string;
  title: string;
  icon?: JSX.Element;
  children?: MenuItem[];
  contentUrl?: string;
};

const menu: MenuItem[] = [
  {
    id: "programacao",
    title: "Programação",
    children: [
      {
        id: "frontend",
        title: "Front-end",
        icon: <FaDesktop />,
        children: [
          {
            id: "react",
            title: "React",
            icon: <FaReact />,
            contentUrl: "https://www.youtube.com/embed/2RWsLmu8yVc"
          }
        ]
      },
      {
        id: "backend",
        title: "Back-end",
        icon: <FaCog />,
        children: [
          {
            id: "node",
            title: "Node",
            icon: <FaNodeJs />,
            contentUrl: "https://www.youtube.com/embed/Oe421EPjeBE"
          },
          {
            id: "python",
            title: "Python + Django",
            icon: <FaPython />,
            contentUrl: "https://www.youtube.com/embed/F5mRW0jo-U4"
          }
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
        icon: <FaUserAlt />,
        children: [
          {
            id: "prototipagem",
            title: "Prototipagem",
            icon: <FaDraftingCompass />,
            contentUrl: "https://www.youtube.com/embed/5W87z8NQ5i4"
          }
        ]
      }
    ]
  },
  {
    id: "jogos",
    title: "Desenvolvimento de Jogos",
    children: [
      {
        id: "unity",
        title: "Unity",
        icon: <SiUnity />,
        contentUrl: "https://www.youtube.com/embed/IlKaB1etrik"
      },
      {
        id: "unreal",
        title: "Unreal",
        icon: <SiUnrealengine />,
        contentUrl: "https://www.youtube.com/embed/eRY2E44TYWM"
      }
    ]
  },
  {
    id: "banco",
    title: "Banco de Dados",
    children: [
      {
        id: "mysql",
        title: "MySQL",
        icon: <GrMysql />,
        contentUrl: "https://www.youtube.com/embed/7S_tz1z_5bA"
      },
      {
        id: "mongodb",
        title: "MongoDB",
        icon: <SiMongodb />,
        contentUrl: "https://www.youtube.com/embed/pWbMrx5rVBE"
      }
    ]
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
  onSelect: (item: MenuItem) => void;
  selected: string;
  depth?: number;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const hasChildren = !!item.children && item.children.length > 0;
  const isOpen = depth === 0 ? openItem === item.id : localOpen;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item);
    if (hasChildren) {
      if (depth === 0) setOpenItem(isOpen ? null : item.id);
      else setLocalOpen(!localOpen);
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
        {item.icon && <span className="menu-icon">{item.icon}</span>}
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
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">Menu de Cursos</div>
        <nav>
          <ul className="menu-root">
            {menu.map((m) => (
              <MenuNode
                key={m.id}
                item={m}
                openItem={openItem}
                setOpenItem={setOpenItem}
                onSelect={(item) => setSelectedItem(item)}
                selected={selectedItem?.title || ""}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <main className="content">
        {selectedItem && selectedItem.contentUrl ? (
          <div className="video-wrapper">
            <div className="video-card">
              <h1>{selectedItem.title}</h1>
              <iframe
                src={selectedItem.contentUrl}
                title={selectedItem.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p>Assista ao curso e pratique o que aprendeu!</p>
            </div>
          </div>
        ) : (
          <div className="video-wrapper">
            <div className="video-card empty">
              <h1>Selecione uma opção</h1>
              <p>O conteúdo do curso aparecerá aqui.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
