import { useState } from 'react';
import './index.css';
import { SlideEditor } from './components/SlideEditor';
import { DesignSettingsPanel } from './components/DesignSettings';
import { SectionHeader } from './components/ui/SectionHeader';
import type { DesignSettings } from './types';
import { DEFAULT_DESIGN_SETTINGS } from './types';

const DEFAULT_JSON = `[
  {
    "type": "title",
    "title": "新入社員研修 \\n〜社会人としての第一歩を踏み出す〜",
    "date": "2026.04.01",
    "notes": "皆さん、入社おめでとうございます。"
  },
  {
    "type": "agenda",
    "title": "本日のプログラム",
    "subhead": "研修の全体像を把握しましょう",
    "items": [
      "社会人に求められるマインドセット",
      "ビジネスマナーの基本",
      "コミュニケーション"
    ]
  }
]`;

function App() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [settings, setSettings] = useState<DesignSettings>(DEFAULT_DESIGN_SETTINGS);
  const [isLoading, setIsLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsLoading(true);
    setErrorMsg(null);
    setResultUrl(null);

    try {
      // JSONのバリデーション
      JSON.parse(jsonInput);

      if (window.google && window.google.script) {
        // GAS環境での実行
        window.google.script.run
          .withSuccessHandler((url: string) => {
            setResultUrl(url);
            setIsLoading(false);
            window.open(url, '_blank');
          })
          .withFailureHandler((error: Error) => {
            setErrorMsg('エラーが発生しました: ' + error.message);
            setIsLoading(false);
          })
          .createPresentationFromFrontend(jsonInput, JSON.stringify(settings));
      } else {
        // ローカル開発用モック
        console.log('Generating slides with:', { json: JSON.parse(jsonInput), settings });
        setTimeout(() => {
          const url = 'https://docs.google.com/presentation/d/mock-presentation-id/edit';
          setResultUrl(url);
          setIsLoading(false);
          window.open(url, '_blank');
        }, 1500);
      }
    } catch (e) {
      setErrorMsg('JSONの形式が正しくありません。確認してください。');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-4rem)]">
        
        {/* Left Column: Slide Data Input */}
        <div className="flex flex-col h-full">
          <SectionHeader number={1} title="スライドデータを入力" />
          <SlideEditor 
            jsonInput={jsonInput} 
            setJsonInput={setJsonInput} 
            isLoading={isLoading} 
          />
        </div>

        {/* Right Column: Design Settings */}
        <div className="flex flex-col h-full overflow-y-auto">
          <SectionHeader number={2} title="デザイン設定" />
          <DesignSettingsPanel 
            settings={settings}
            setSettings={setSettings}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            resultUrl={resultUrl}
            errorMsg={errorMsg}
          />
        </div>

      </div>
    </div>
  );
}

export default App;

