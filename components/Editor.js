import { ClipboardIcon, PhotographIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import OGPreview from 'components/OGPreview';
import { SliderPicker, TwitterPicker } from 'components/react-color';
import { supabase } from 'lib/supabaseClient';
import { useState } from 'react';
import toast from 'react-hot-toast';
import CodeBlock from './CodeBlock';
import Loading from './Loading';

export default function Editor({ projectId, projectData }) {
  const [project, setProject] = useState(projectData);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const setProperty = (key, value) => {
    setProject((project) => ({ ...project, [key]: value }));
    setHasChanges(true);
  };

  if (!project) return <Loading />;

  const previewProps = {
    title: project.title,
    description: project.description,
    background_color: project.background_color,
    font_style: project.font_style,
    left_meta: project.left_meta,
    right_meta: project.right_meta,
  };

  const previewQuery = new URLSearchParams(previewProps).toString();
  const ogImageUrl = `https://ogsupa.com/api/v1?${previewQuery}`;

  async function saveProject() {
    try {
      setIsSaving(true);
      const updates = {
        ...project,
        updated_at: new Date(),
      };
      let { error } = await supabase.from('projects').upsert(updates, {
        returning: 'minimal',
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSaving(false);
      setHasChanges(false);
    }
  }

  return (
    <div className="flex flex-col items-center w-full mb-20 space-y-6 md:items-start md:w-auto md:flex-row md:space-x-4 md:space-y-0 lg:py-0 lg:space-x-10">
      {/* FORM COLUMN */}
      <div className="flex flex-col min-w-[288px] max-w-[380px]">
        <form
          className="rounded-xl mx-2 sm:m-0 p-3 pt-2 bg-white border-4 border-b-[6px] box-pink"
          style={{
            borderColor: '#7801fd',
          }}
        >
          <div className="space-y-6 gap-x-4">
            <div className="">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                name="title"
                type="text"
                className="input mt-1 text-sm md:text-base shadow-sm block w-full border-gray-300 rounded-md"
                value={project.title}
                onChange={({ target }) => setProperty('title', target.value)}
              />
            </div>
            <div className="">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="input mt-1 text-sm md:text-base shadow-sm block w-full border border-gray-300 rounded-md"
                value={project.description}
                onChange={({ target }) =>
                  setProperty('description', target.value)
                }
              />
              <p className="mt-2 text-sm text-gray-500"></p>
            </div>
            <div className="">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Title Font
              </label>
              <div className="mt-1">
                <select
                  name="country"
                  autoComplete="country"
                  className="input text-sm md:text-base shadow-sm block w-full border-gray-300 rounded-md"
                  value={project.font_style}
                  onChange={({ target }) =>
                    setProperty('font_style', target.value)
                  }
                >
                  <option value="font-serif">Serif</option>
                  <option value="font-sans">Sans</option>
                  <option value="font-mono">Mono</option>
                </select>
              </div>
            </div>
            <div className="">
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700"
              >
                Background Color
              </label>
              <div className="mt-1">
                <TwitterPicker
                  className="block m-auto mt-3"
                  colors={[
                    '#BF4F00',
                    '#BD8B00',
                    '#37CA8F',
                    '#009C63',
                    '#2EAAF9',
                    '#056EAA',
                    '#768B9D',
                    '#B00F39',
                    '#F13261',
                    '#7300B3',
                  ]}
                  color={project.background_color}
                  onChangeComplete={(color) =>
                    setProperty('background_color', color.hex)
                  }
                  triangle="hide"
                />
                <SliderPicker
                  className="ml-[9px] -mt-3 max-w-[224px]"
                  color={project.background_color}
                  onChangeComplete={({ hex }) =>
                    setProperty('background_color', hex)
                  }
                />
              </div>
            </div>
            <div className="grid gap-2 grid-cols-2">
              <div className="flex-1">
                <label
                  htmlFor="left"
                  className="block text-sm font-medium text-gray-700"
                >
                  Left Meta
                </label>
                <input
                  name="left"
                  type="text"
                  size={1}
                  className="input w-full mt-1 text-sm md:text-base shadow-sm border-gray-300 rounded-md"
                  value={project.left_meta}
                  onChange={(e) => setProperty('left_meta', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="right"
                  className="text-right block text-sm font-medium text-gray-700"
                >
                  Right Meta
                </label>
                <input
                  name="right"
                  type="text"
                  size={1}
                  className="input w-full mt-1 text-sm md:text-base shadow-sm border-gray-300 rounded-md"
                  value={project.right_meta}
                  onChange={(e) => setProperty('right_meta', e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="text-right mr-2 sm:mr-0">
          {hasChanges && (
            <p className="inline mr-2 text-sm text-gray-600 italic">
              未保存的更改
            </p>
          )}
          <button
            className={cn(
              'inline mt-1 px-2 py-0.5 rounded-lg text-white bg-white box-pink-sm',
              { 'text-indigo-400': isSaving }
            )}
            style={{ backgroundColor: '#7801fd' }}
            onClick={saveProject}
            disabled={isSaving}
          >
            Save
          </button>
        </div>
      </div>
      {/* PREVIEW COLUMN */}
      <div className="flex flex-col w-full items-center">
        <div className="m-auto rounded-md overflow-hidden box-pink">
          <OGPreview {...previewProps} />
        </div>
        <div className="buttons m-auto">
          <div className="w-[300px] md:w-[450px] lg:w-[600px] text-center mt-4 space-y-2">
            <div className="">
              <a
                className="box-pink-sm -rotate-1 hover:rotate-1 inline-flex items-center px-2 py-1 my-2 border-2 border-transparent shadow-sm text-md leading-4 font-medium rounded-md text-white focus:outline-none"
                style={{ backgroundColor: '#f804ef' }}
                href={`/preview?${previewQuery}`}
                target="_blank"
              >
                <PhotographIcon
                  className="-ml-0.5 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                在新标签页中打开预览
              </a>
            </div>
            <button
              title="Copy to clipboard"
              className="box-pink-sm rotate-3 hover:rotate-1 m-auto w-1/2 min-w-[240px] truncate px-2 py-1 text-md rounded-md border-2 border-indigo-400 bg-indigo-100  hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
              style={{ backgroundColor: '#ffe228', borderColor: '#ff6152' }}
            >
              <ClipboardIcon
                className="inline  -mt-1 -ml-1.5 mr-1 h-5 w-5"
                style={{ color: '#ff6152' }}
                aria-hidden="true"
              />
              <span className="font-medium mr-0.5" style={{ color: '#dd3a2a' }}>
                Copy{' '}
              </span>
              <code
                className="inline"
                onClick={() => {
                  navigator.clipboard.writeText(ogImageUrl);
                  toast.success('Copied to clipboard');
                }}
              >
                ?{previewQuery}
              </code>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMetaString(ogImageUrl) {
  return `<meta property="og:image" content="${ogImageUrl}"/>`;
}

function getTwitterMetaString(ogImageUrl) {
  return `<meta name="twitter:card" content="summary_large_image">
<meta property="og:image" content="${ogImageUrl}"/>`;
}
