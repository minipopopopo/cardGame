import { StarIcon } from '@heroicons/react/solid';
import Sparkles from 'components/Sparkles';
import Start from 'components/Start';
import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((event, session) => {
      console.log('onAuthStateChange', event);
      setSession(session);
    });
  }, []);

  return (
    <>
      <p className="mb-8 text-xl sm:text-2xl font-bold leading-6 border-0 border-b-4 border-indigo-600 text-gray-900">
        图像生成器！
      </p>
      <div className="w-full max-w-xl">
        <div
          className="relative m-5 py-1 pb-1.5 px-3 font-medium text-md bg-white rounded-xl p-3 pt-2 border-4 border-b-[6px] box-pink"
          style={{
            borderColor: '#7801fd',
            color: '#7e0079',
          }}
        >
          <span className="rotate-12 text-5xl -top-4 -right-4 absolute cursor-default">
            ⚡️
          </span>
          <p style={{ color: '#5800ba' }}>
            <span className="relative inline-block text-2xl top-1">🎉</span>
            &nbsp;&nbsp;空链接预览已成为过去!
          </p>
          <p style={{ color: '#bc00b5' }}>
            <span className="relative inline-block text-2xl top-1">🎨</span>
            &nbsp;&nbsp;生成可自定义的og：实时图像
          </p>
          <p className="mb-2" style={{ color: '#d67963' }}>
            <span className="relative inline-block text-2xl top-1">🚀</span>
            &nbsp;&nbsp;保存许多不同的项目型式以供编辑
          </p>
        </div>
      </div>
      <Start session={session} text="开始制作图像!" />

    </>
  );
}
