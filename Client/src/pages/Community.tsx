import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import playlistimg from '../assets/images/Rectangle 64.png';
import 'animate.css';
import PlaylistIcon from '../components/Playlist/PlaylistIcon';

interface Post {
  postId: number;
  title: string;
  voteCount: number;
  viewCount: number;
  text: string;
  // nickName: string;
  memberId: number;
}

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 여기서 검색어(searchQuery)를 활용하여 검색 로직을 구현할 수 있습니다.
    console.log('검색어:', searchQuery);
  };

  const handleWriteButton = () => {
    navigate('./write');
  };

  useEffect(() => {
    axios
      .get(
        'http://ec2-15-164-171-149.ap-northeast-2.compute.amazonaws.com:8080/posts?page=1&size=10'
      )
      .then((res) => {
        console.log(res);
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-b from-[#D5E5F0] to-[#87c4ed]">
        <div className="">
          <Header />
        </div>
        <div className="flex flex-col w-full h-[1024px] items-center mt-4">
          <div className="flex w-[875px] h-[67px] items-center border-b-[1px] border-solid border-[#000000] justify-center">
            <button className="w-[140px] text-center text-xs underline" onClick={handleWriteButton}>
              글쓰기
            </button>

            <form onSubmit={handleSearchSubmit} className=" w-[700px] ">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="text-center text-xs w-[300px] ml-10 rounded-xl h-[30px] border-1 border-solid border-[#000000]"
                placeholder="게시글 검색"
              />
            </form>

            <button className="w-[50px] text-center text-xs underline">조회순</button>
            <button className="w-[50px] text-center text-xs underline">추천순</button>
          </div>
          <div>
            <table className="flex flex-col w-[875px] items-center justify-center ">
              {posts &&
                posts.map((item) => (
                  <tr
                    className="flex w-[875px] h-[67px] items-center border-b-[1px] border-solid border-[#bdc2f8] justify-center"
                    key={item.postId}
                  >
                    <td className="w-[50px] text-center text-xs">1</td>
                    <td className="w-[100px]">
                      <img src={playlistimg} alt="임시사진" />
                    </td>

                    <td className="w-[700px] text-start text-xs ml-10">
                      <a href={`./community/${item.postId}`}>{item.title}</a>
                    </td>
                    <td className="w-[50px] text-center text-xs">{item.viewCount}</td>
                    <td className="w-[50px] text-center text-xs">{item.voteCount}</td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
        <PlaylistIcon />
      </div>
    </>
  );
};

export default Community;
