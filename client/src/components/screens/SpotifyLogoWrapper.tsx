import { SpotifyLogo } from "../../logo/SpotifyLogo";

export const SpotifyLogoWrapper = ({ children }: { children: any }) => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: 64,
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            boxShadow: "-3px -1px 15px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <SpotifyLogo variant="black" height={32} />
        </div>
      </div>
      {children}
    </div>
  );
};
