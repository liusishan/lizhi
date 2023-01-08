import { useEffect, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette,
} from 'react-cmdk';
import { Link } from 'umi';
import 'react-jinke-music-player/assets/index.css';
import './index.css';
import 'react-cmdk/dist/cmdk.css';

const audioLists = window.list?.map((v) => {
  return {
    name: `${v.name} · ${v.artist}`.replace('专辑-', ''),
    musicSrc: v.url,
    cover: v.cover,
    singer: '李志',
  };
});

const options = {
  audioLists,
  theme: 'dark',
  locale: 'zh_CN',
  showMediaSession: true,
  autoPlay: false,
  toggleMode: false,
  mode: 'full',
  showLyric: false,
  showThemeSwitch: false,
  showReload: false,
  // showDownload: !window.location.href.includes('from=pake'),
};

export default function Layout({ children, location }) {
  const [active, setActive] = useState('all');

  const [page, setPage] = useState<'root' | 'albums'>('root');
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');

  useHandleOpenCommandPalette(setOpen);

  useEffect(() => {
    document
      .querySelector('.music-player-panel')
      .classList.add('backdrop-blur-md');
    document
      .querySelector('.audio-lists-panel')
      .classList.add('backdrop-blur-md');
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: 'Home',
        id: 'home',
        items: [
          {
            id: 'home',
            children: '首页',
            icon: 'HomeIcon',
            href: '/',
          },
          {
            id: 'live',
            children: '现场',
            icon: 'SunIcon',
            href: '/#/video',
          },
          {
            id: 'albums',
            children: '专辑',
            icon: 'MapIcon',
            closeOnSelect: false,
            onClick: () => {
              setPage('albums');
            },
          },
        ],
      },
    ],
    search,
  );

  return (
    <div className="w-screen h-screen bg-black text-white pl-64">
      <div className="fixed top-0 left-0 w-64 h-screen p-10 pb-0 flex flex-col justify-between">
        <div>
          <h2 className="text-white text-3xl mb-4 font-bold">李志</h2>

          <div
            onClick={() => setOpen(true)}
            className="bg-gray-900 relative pointer-events-auto cursor-pointer"
          >
            <div className="w-full flex items-center text-sm leading-6 text-gray-400 rounded-md ring-1 ring-gray-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-gray-600 bg-gray-800 highlight-white/5 hover:bg-gray-700">
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-3 flex-none"
              >
                <path
                  d="m19 19-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
              Search...
              <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                ⌘K
              </span>
            </div>
          </div>

          <h3 className="text-gray-500 text-sm py-1"></h3>
          <div className="space-y-4">
            <Link
              to="/"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname === '/' &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              💿<span className="pl-4">专辑</span>
            </Link>
            <Link
              to="/video"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname.startsWith('/video') &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              🔥<span className="pl-4">Live</span>
            </Link>
            <Link
              to="/about"
              className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer ${
                location.pathname.startsWith('/about') &&
                'bg-green-500 shadow shadow-green-500/50'
              }`}
            >
              🧑<span className="pl-4">自传</span>
            </Link>
            {/*<Link*/}
            {/*  to="/download"*/}
            {/*  className={`block text-white hover:text-white transition py-1 px-4 rounded hover:bg-green-500 cursor-pointer*/}
            {/*  ${*/}
            {/*    location.pathname.startsWith('/download') &&*/}
            {/*    'bg-green-500 shadow shadow-green-500/50'*/}
            {/*  } ${window.location.href.includes('from=pake') && 'hidden'}`}*/}
            {/*  onClick={() => setActive('download')}*/}
            {/*>*/}
            {/*  📦<span className="pl-4">APP</span>*/}
            {/*</Link>*/}
            <a
              href="https://pan.baidu.com/s/17LHv_8gI_Ee5RJqnzSuYIg?pwd=c8af"
              target="_blank"
              className="block text-white hover:text-white transition py-1 px-4 rounded hover:bg-gray-500 cursor-pointer"
            >
              🎸<span className="pl-4">琴谱</span>
            </a>
          </div>

          <br />
        </div>

        <img
          className="w-36 opacity-50"
          src={require('@/assets/lizhi.png')}
          alt=""
        />
      </div>
      <div className="w-[100% - 256px] h-screen overflow-y-auto px-8 py-10">
        {children}
      </div>
      <ReactJkMusicPlayer {...options} />

      <CommandPalette
        onChangeSearch={setSearch}
        onChangeOpen={setOpen}
        search={search}
        isOpen={open}
        page={page}
      >
        <CommandPalette.Page id="root">
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <CommandPalette.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <CommandPalette.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </CommandPalette.List>
            ))
          ) : (
            <CommandPalette.FreeSearchAction />
          )}
        </CommandPalette.Page>

        <CommandPalette.Page id="albums">
          {/* Projects page */}
          <CommandPalette.FreeSearchAction />
        </CommandPalette.Page>
      </CommandPalette>
    </div>
  );
}
