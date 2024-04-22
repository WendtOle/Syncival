import { SpotifyLogo } from "../logo/SpotifyLogo";

export const SpotifyLogoWrapper = ({ children }: { children: any }) => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          right: 10,
          justifyContent: "end",
          backgroundColor: "white",
        }}
      >
        <SpotifyLogo variant="black" size={48} />
      </div>
      {children}
    </div>
  );
};
