import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { closeDetailModal, openToastModal } from '../../redux/slice/ModalSlice';
import { playlistInfo } from '../../redux/slice/PlaylistsSlice';
import xbtn from '../../assets/images/xbtn.svg';
// import PlaylistsDetail from './PlayListsDetail';
import Playlists from './Playlists';
import ToastModal from '../Modal/ToastModal';
import { RootState } from '../../redux/store';

export type PlaylistInfo = {
  title: string;
  playlistId: number;
};

const PlaylistsShowAll = () => {
  const dispatch = useDispatch();

  // const isOpenSong = useSelector((state: RootState) => state.modal.isSongOpen);
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjozNiwic3ViIjoidGVzdHRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNjkzOTE0NzE2LCJleHAiOjE2OTM5MTY1MTZ9.yyVl_L-x5xpjJ8WRFXSqR6nvu95BRg08NHFdCAYMSOg"
  const isOpenToast = useSelector((state: RootState) => state.modal.isToastOpen);
  const playlistsInfo: PlaylistInfo[] = useSelector((state: RootState) => state.playlists.value);

  const handleCloseModal = () => {
    dispatch(closeDetailModal());
  };

  const handleOpenToast = () => {
    dispatch(openToastModal());
  };

  useEffect(() => {
    axios
      .get('http://ec2-15-164-171-149.ap-northeast-2.compute.amazonaws.com:8080/playlist')
      .then((res) => {
        dispatch(playlistInfo(res.data.data));
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleDeletePlayList = () => {
  //   return
  //   axios .
  // }

  return (
    <>
      <div className="fixed w-full h-full flex justify-center items-center bottom-0 bg-[#182129f1] bg-opacity-80 ">
        <div className="animate-fadeInBottomRight-fast">
          <div className="w-[1100px] h-[850px] rounded-2xl bg-gradient-to-b from-[#000000f3] to-[#1d2435] shadow-xl text-[#b3b4ca] animate-scale-anim  ">
            {/* 플레이리스트 상단 */}
            <div className="flex justify-around mt-2">
              <button onClick={handleCloseModal} className="mr-20 mt-8 ">
                <img src={xbtn} className="w-[35px]" />
              </button>
              {/* 검색칸 */}
              <div className="flex mt-8">
                <input
                  type="text"
                  placeholder="   플레이리스트 이름을 입력해주세요"
                  className="w-[528px] h-[50px] bg-[#444444d0] rounded-3xl border border-gray-500"
                ></input>
              </div>
              <button className="mt-8"></button>
            </div>
            {/* 플레이리스트 */}
            <div className="w-full h-[50px] flex justify-between items-center mt-8 font-['Anton-Regular']">
              <h1 className="ml-8">My Playlists</h1>
            </div>
            {/* 플리 앨범, 제목, 내용 */}
            <ul className="w-full h-[550px] mt-6 flex flex-wrap overflow-y-scroll">
              {playlistsInfo.map((el) => (
                <Playlists key={el.playlistId} el={el} playlistId={el.playlistId} />
              ))}
            </ul>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleOpenToast}
                className="w-[150px] h-[50px] mb-4 mr-4 rounded-2xl border-2 border-purple-400 hover:bg-[#9574b1] hover:text-white"
              >
                추가
              </button>
              <button className="w-[150px] h-[50px] mb-4 ml-4 rounded-2xl border-2 border-purple-400 hover:bg-[#9574b1] hover:text-white">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {isOpenSong && <PlaylistsDetail />} */}
      {isOpenToast && <ToastModal />}
    </>
  );
};

export default PlaylistsShowAll;
