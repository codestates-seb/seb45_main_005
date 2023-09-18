import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {
  closeModal,
  openDetailModal,
  openMyShowAll,
  openSongLists,
} from '../../redux/slice/ModalSlice';
import {
  setSelectedPlaylistId,
  playlistInfo,
  myPlaylist,
  setPlaylistTitle,
} from '../../redux/slice/PlaylistsSlice';
import { RootState } from '../../redux/store';
import xbtn from '../../assets/images/xbtn.svg';
import PlaylistsShowAll from '../Playlist/PlaylistsShowAll';
import PlaylistsDetail from '../Playlist/PlayListsDetail';
import MyPlaylistsShowAll from '../Playlist/MyPlaylistsShowAll';
import playlistdisc from '../../assets/images/playlistdisc.png';

export type PlaylistInfo = {
  title: string;
  playlistId: number;
};

export type SongData = {
  title: string;
  imageUrl: string;
  album: string;
  artistName: string;
  songId: number;
};

export type PlaylistData = {
  title: string;
  views: number;
  playlistId: number;
  memberId: number;
  playlistSongs: [];
  playlistTags: [];
};

const PlaylistModal = () => {
  const headers = {
    'Access-Control-Allow-Origin': `${process.env.REACT_APP_FE_HEADER_URL}`,
  };
  const token = useSelector((state: RootState) => state.login.accessToken);
  const dispatch = useDispatch();
  const isDetailOpen = useSelector((state: RootState) => state.modal.isSongOpen);
  const isShowAll = useSelector((state: RootState) => state.modal.isDetailOpen);
  const isMyShowAll = useSelector((state: RootState) => state.modal.isMyShowAll);
  const playlistsInfo: PlaylistInfo[] = useSelector((state: RootState) => state.playlists.value);
  const myPlaylistsInfo: PlaylistInfo[] = useSelector(
    (state: RootState) => state.playlists.myPlaylist
  );

  const handleOpenDetail = () => {
    dispatch(openDetailModal());
  };

  const handleMyShowAll = () => {
    dispatch(openMyShowAll());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleOpenListDetail = (playlistId: number, title: string) => {
    dispatch(openSongLists());
    dispatch(setSelectedPlaylistId(playlistId));
    dispatch(setPlaylistTitle(title));
  };

  const getPlaylists = (): void => {
    axios
      .get(`${process.env.REACT_APP_BE_API_URL}/playlist/my?page=1&size=10`, {
        headers: {
          'Authorization': token,
          'Access-Control-Allow-Origin': `${process.env.REACT_APP_FE_HEADER_URL}`,
        },
      })
      .then((res) => {
        dispatch(myPlaylist(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 마이 플리 받아오기
  useEffect(() => {
    getPlaylists();
  }, []);

  // 플레이리스트 받아오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BE_API_URL}/playlist`, {
        headers,
      })
      .then((res) => {
        dispatch(playlistInfo(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="fixed bottom-0 flex justify-center bg-opacity-1 ">
        <div className="w-[600px] h-[670px] mt-12 animate-fadeInBottomRight-fast fixed right-8 bottom-40">
          <div className="h-[670px] flex flex-col justify-center items-center rounded-2xl bg-gradient-to-b from-[#000000f3] to-[#1d2435] shadow-xl text-[#b3b4ca] animate-scale-anim  ">
            {/* 플레이리스트 상단 */}
            <div className="flex justify-around">
              <button onClick={handleCloseModal} className="mr-10 mt-8 ">
                <img src={xbtn} className="w-[35px]" />
              </button>
              {/* 검색칸 */}
              <div className="flex mt-8">
                <input
                  type="text"
                  placeholder="   플레이리스트 이름을 입력해주세요"
                  className="w-[400px] h-[50px] bg-[#444444d0] rounded-3xl border border-gray-500"
                ></input>
              </div>
              <button className="mt-8"></button>
            </div>
            {/* 플레이리스트 */}
            <div className="w-full h-[50px] flex justify-between items-center mt-8 font-['Anton-Regular']">
              <h1 className="ml-8">My Playlists</h1>
              <button onClick={handleMyShowAll} className="mr-12">
                더보기
              </button>
            </div>
            {/* 플리 앨범, 제목, 내용 */}
            <ul className="w-[550px] mt-6 flex">
              {myPlaylistsInfo.map((myEl, index) => {
                if (index <= 4) {
                  return (
                    <li
                      onClick={() => handleOpenListDetail(myEl.playlistId, myEl.title)}
                      className="h-[150px] w-[150px] flex justify-start items-center text-center hover:translate-y-[-15px] transition duration-300 ease-in-out"
                    >
                      <div className=" cursor-pointer w-[100px] h-[100px]">
                        <img src={playlistdisc} className="animate-spin-slow" />
                        <h1 className="mt-4 text-xs">{myEl.title}</h1>
                      </div>
                    </li>
                  );
                }
                return <></>;
              })}
            </ul>
            {/* 마이 플레이리스트 */}
            <div className="w-full h-[50px] flex justify-between items-center mt-12 font-['Anton-Regular']">
              <h1 className="ml-8">Recommend</h1>
              <button onClick={handleOpenDetail} className="mr-12">
                더보기
              </button>
            </div>
            {/* 플리 앨범, 제목, 내용 */}
            <ul className="w-[550px] mt-2 flex justify-center">
              {playlistsInfo.map((el, index) => {
                if (index <= 4) {
                  return (
                    <li
                      onClick={() => handleOpenListDetail(el.playlistId, el.title)}
                      className="h-[150px] w-[150px] flex justify-start items-center text-center hover:translate-y-[-15px] transition duration-300 ease-in-out"
                    >
                      <div className=" cursor-pointer w-[100px] h-[100px]">
                        <img src={playlistdisc} className="animate-spin-slow" />
                        <h1 className="mt-4 text-xs">{el.title}</h1>
                      </div>
                    </li>
                  );
                }
                return <></>;
              })}
            </ul>
            <div className="w-[150px] h-[30px] mb-4 mt-8"></div>
          </div>
        </div>
      </div>
      {isDetailOpen && <PlaylistsDetail />}
      {isShowAll && <PlaylistsShowAll />}
      {isMyShowAll && <MyPlaylistsShowAll />}
    </>
  );
};

export default PlaylistModal;
