interface SlideEditorProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
  isLoading: boolean;
}

export function SlideEditor({ jsonInput, setJsonInput, isLoading }: SlideEditorProps) {
  return (
    <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 h-full flex flex-col p-4">
      {isLoading && (
        <div className="bg-gray-100 p-3 rounded mb-4 flex items-center text-sm text-gray-700 animate-pulse">
          <span className="mr-2">⏳</span> JSON入力待機中...
        </div>
      )}
      
      <textarea
        className="w-full flex-grow p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm"
        placeholder="ここにJSONを入力してください..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
