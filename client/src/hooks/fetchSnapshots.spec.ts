const mockGetSnapshots = jest.fn();

import { PlaylistInformation, Track } from "../state/types";
import { fetchPlaylists } from "./fetchPlaylists";
import { fetchSnapshots } from "./fetchSnapshots";

jest.mock("../state/loadEnvVariables.ts", () => ({
  backendUrl: "dummy-backend-url",
}));
jest.mock("../provider/songs.ts", () => ({
  getPlaylistTracks: mockGetSnapshots,
}));

const playlistInfo: PlaylistInformation = {
  name: "Your summer rewind",
  id: "your-summer-rewind-playlist-id",
  isOwn: false,
  snapShotId: "your-summer-rewind-playlist-snapshot-id",
  snapShotDate: new Date("2024-08-01T00:00:00.000Z"),
};

const track: Track = {
  id: "worth-it-track-id",
  name: "Worth it",
  artists: [{ id: "odnp-artist-id", name: "ODNP" }],
  albumName: "Worth it",
};

const onlyReturnFirstPage = <T>(output: T, page: number, defaultValue: T) =>
  page !== 0 ? defaultValue : output;

describe("useFetchPlaylists", () => {
  it("does not fetch already existing snapshot", async () => {
    //Act
    await fetchSnapshots({
      accessToken: () => "access-token",
      existingSnapshots: { [playlistInfo.snapShotId]: [track] },
      playlistInfo: { [playlistInfo.id]: playlistInfo },
      addSnapshot: () => {},
      removeSnapshots: () => {},
    });

    //Assert
    expect(mockGetSnapshots).not.toHaveBeenCalled();
  });
  it("fetch not existing snapshot", async () => {
    //Arrange
    mockGetSnapshots.mockImplementation((_, page) =>
      onlyReturnFirstPage(Promise.resolve([track]), page, Promise.resolve([]))
    );

    //Act
    await fetchSnapshots({
      accessToken: () => "access-token",
      existingSnapshots: {},
      playlistInfo: { [playlistInfo.id]: playlistInfo },
      addSnapshot: () => {},
      removeSnapshots: () => {},
    });

    //Assert
    expect(mockGetSnapshots).toHaveBeenCalled();
  });
});
