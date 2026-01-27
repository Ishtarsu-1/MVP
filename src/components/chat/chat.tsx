import { useState } from "react";
import { mockConversations } from "./chatData";
import "./chat.css";

function Chat() {
  const [activeTab, setActiveTab] = useState("message");
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newConvName, setNewConvName] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateConversation = () => {
    if (!newConvName.trim()) return;

    setConversations([
      {
        id: Date.now().toString(),
        username: newConvName,
        lastMessage: "Nouvelle conversation",
        timestamp: "now",
        avatar: "👤",
      },
      ...conversations,
    ]);

    setNewConvName("");
    setShowCreateModal(false);
  };

  const handleDeleteConversation = (id) => {
    setConversations(conversations.filter((c) => c.id !== id));
  };

  return (
    <div className="chat">
      {/* HEADER */}
      <div className="chat-header">
        <h1 className="chat-title">CharlyLeRider</h1>

        <div className="chat-search">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>🔍</button>
        </div>
      </div>

      {/* TABS */}
      <div className="chat-tabs">
        <button
          className={activeTab === "message" ? "active" : ""}
          onClick={() => setActiveTab("message")}
        >
          Messages
        </button>

        <button
          className={activeTab === "groupe" ? "active" : ""}
          onClick={() => setActiveTab("groupe")}
        >
          Groupes
        </button>

        <button className="chat-new" onClick={() => setShowCreateModal(true)}>
          +
        </button>
      </div>

      {/* LIST */}
      <div className="chat-list">
        {filteredConversations.map((conv) => (
          <div key={conv.id} className="chat-item">
            <div className="chat-avatar">{conv.avatar}</div>

            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-username">{conv.username}</span>
                <span className="chat-time">{conv.timestamp}</span>
              </div>
              <div className="chat-preview">{conv.lastMessage}</div>
            </div>

            <button
              className="chat-delete"
              onClick={() => handleDeleteConversation(conv.id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showCreateModal && (
        <div className="chat-modal">
          <div className="chat-modal-content">
            <h2>
              {activeTab === "message"
                ? "Nouvelle conversation"
                : "Nouveau groupe"}
            </h2>

            <input
              type="text"
              placeholder="Nom..."
              value={newConvName}
              onChange={(e) => setNewConvName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateConversation()}
            />

            <div className="chat-modal-actions">
              <button onClick={handleCreateConversation}>Créer</button>
              <button onClick={() => setShowCreateModal(false)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
