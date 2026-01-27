import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      {/* HEADER */}
      <div className="profile-header">
        <h1 className="profile-username">Ishtar</h1>
        <button className="profile-settings">⚙️</button>
      </div>

      {/* USER INFO */}
      <div className="profile-info">
        <img className="profile-avatar"src="./rin.jpg" width ="90px" height="90px" alt="profile pic" />

        <div className="profile-stats">
          <div>
            <span className="stat-number">128</span>
            <span className="stat-label">Posts</span>
          </div>
          <div>
            <span className="stat-number">2.4k</span>
            <span className="stat-label">Followers</span>
          </div>
          <div>
            <span className="stat-number">312</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>

      {/* BIO */}
      <div className="profile-bio">
        <p className="profile-name">Ishtarsu </p>
        <p>Volley | Voyages | Ski</p>
        <p className="profile-link">Ishtarsu.com</p>
      </div>

      {/* ACTIONS */}
      <div className="profile-actions">
        <button className="btn-primary">Modifier le profil</button>
        <button className="btn-secondary">Partager</button>
      </div>

      {/* STORIES */}
      <div className="profile-stories">
        <div className="story">
          <div className="story-avatar">📍</div>
          <span>Trips</span>
        </div>
        <div className="story">
          <div className="story-avatar">🔥</div>
          <span>Ride</span>
        </div>
        <div className="story">
          <div className="story-avatar">🏔️</div>
          <span>Nature</span>
        </div>
        <div className="story add">
          <div className="story-avatar">+</div>
          <span>Nouveau</span>
        </div>
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        <button className="active">▦</button>
        <button>🎥</button>
        <button>🏷️</button>
      </div>

      {/* GRID */}
    </div>
  );
}

export default Profile;
