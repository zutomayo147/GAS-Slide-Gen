import type { DesignSettings } from '../types';
import { Accordion } from './ui/Accordion';

interface DesignSettingsProps {
  settings: DesignSettings;
  setSettings: (settings: DesignSettings) => void;
  onGenerate: () => void;
  isLoading: boolean;
  resultUrl: string | null;
  errorMsg: string | null;
}

const PRESETS = [
  { name: 'Default', color: '#1B2A4A', font: 'Noto Sans JP' },
  { name: 'Corporate', color: '#0F3460', font: 'Biz UDMincho' },
  { name: 'Creative', color: '#E94560', font: 'M PLUS Rounded 1c' },
];

export function DesignSettingsPanel({
  settings,
  setSettings,
  onGenerate,
  isLoading,
  resultUrl,
  errorMsg
}: DesignSettingsProps) {
  
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = PRESETS.find(p => p.name === e.target.value);
    if (selected) {
      setSettings({
        ...settings,
        presetName: selected.name,
        themeColor: selected.color,
        fontFamily: selected.font
      });
    }
  };

  return (
    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 p-6 space-y-6">
      
      {/* プリセット保存 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">保存済みプリセット</label>
        <div className="flex gap-2">
          <select 
            className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm"
            value={settings.presetName}
            onChange={handlePresetChange}
          >
            {PRESETS.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">保存</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600">削除</button>
        </div>
      </div>

      {/* カラー & フォント */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">プライマリカラー</label>
          <div className="flex items-center gap-2">
            <input 
              type="color" 
              value={settings.themeColor}
              onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
              className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input 
              type="text" 
              value={settings.themeColor}
              onChange={(e) => setSettings({...settings, themeColor: e.target.value})}
              className="flex-grow border border-gray-300 rounded px-2 py-2 text-sm bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">フォント</label>
          <select 
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={settings.fontFamily}
            onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
          >
            <option value="Noto Sans JP">Noto Sans JP</option>
            <option value="BIZ UDPGothic">BIZ UDPGothic</option>
            <option value="M PLUS Rounded 1c">M PLUS Rounded 1c</option>
          </select>
        </div>
      </div>

      {/* フッターテキスト */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">フッターテキスト</label>
        <input 
          type="text" 
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
          value={settings.footerText}
          onChange={(e) => setSettings({...settings, footerText: e.target.value})}
        />
      </div>

      {/* 保存先フォルダURL */}
      <div>
        <label className="block text-sm font-medium text-blue-600 mb-1">保存先フォルダURL</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-grow border border-gray-300 rounded px-3 py-2 text-sm"
            value={settings.outputFolderUrl}
            onChange={(e) => setSettings({...settings, outputFolderUrl: e.target.value})}
          />
          <button className="bg-gray-500 text-white px-3 py-2 rounded text-xs hover:bg-gray-600">開く</button>
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-2">
        <Accordion title="装飾設定">
          <p className="text-sm text-gray-500">（装飾設定の内容がここに入ります）</p>
        </Accordion>
        <Accordion title="ロゴ設定">
           <p className="text-sm text-gray-500">（ロゴ設定の内容がここに入ります）</p>
        </Accordion>
        <Accordion title="背景設定">
           <p className="text-sm text-gray-500">（背景設定の内容がここに入ります）</p>
        </Accordion>
      </div>

      {/* Generate Button */}
      <button 
        onClick={onGenerate}
        disabled={isLoading}
        className={`w-full py-4 text-white font-bold rounded-lg shadow-md transition-all ${
          isLoading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
        }`}
      >
        {isLoading ? '生成中...' : 'プレゼンテーションを生成'}
      </button>

      {/* Messages */}
      {errorMsg && (
        <div className="p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
          {errorMsg}
        </div>
      )}
      
      {resultUrl && (
        <div className="p-3 bg-green-100 text-green-700 text-sm rounded border border-green-200">
          生成完了！ <a href={resultUrl} target="_blank" rel="noreferrer" className="underline font-bold">こちらをクリック</a>
        </div>
      )}

    </div>
  );
}
