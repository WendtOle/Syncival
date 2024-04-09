import { SpotifyIcon } from "../logo/SpotifyIcon";

export const SpotifyLogoWrapper = ({ children }: { children: any }) => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          right: 10,
          background: "white",
        }}
      >
        <SpotifyIcon variant="black" size={48} />
      </div>
      {children}
    </div>
  );
};
