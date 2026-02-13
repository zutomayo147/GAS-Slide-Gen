import { SlideService } from './services/slideService';
import { SlideData } from './domain/slideTypes';

declare let global: any;

global.doGet = (_e: any) => {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('Google Slides Generator')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
};

/**
 * フロントエンドから呼び出される関数
 * JSON文字列を受け取り、スライドを生成してURLを返す
 */
global.createPresentationFromFrontend = (jsonString: string, settingsJson?: string): string => {
    try {
        const jsonData: SlideData[] = JSON.parse(jsonString);
        let settings: any = undefined;
        if (settingsJson) {
             settings = JSON.parse(settingsJson);
        }

        // タイトルは最初のスライドから取得、なければデフォルト
        let title = 'New Presentation';
        if (jsonData.length > 0 && jsonData[0].type === 'title' && jsonData[0].title) {
            title = jsonData[0].title.split('\n')[0]; // 改行があれば1行目を使う
        }
        
        const url = SlideService.generatePresentation(jsonData, { title, settings });
        return url;
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error('スライド生成に失敗しました: ' + message);
    }
};

/**
 * テスト用：組み込みJSONデータでスライド生成を実行する
 * GASエディタから直接実行可能。
 */
global.generateSlides = () => {
    const sampleData: SlideData[] = [
        {
            type: 'title',
            title: '新入社員研修 \n〜社会人としての第一歩を踏み出す〜',
            date: '2026.04.01',
            notes: '皆さん、入社おめでとうございます。本日から社会人としての新しい生活が始まります。この研修では、学生から社会人への意識の切り替えと、明日から使える基礎知識を学んでいきましょう。',
        },
        {
            type: 'agenda',
            title: '本日のプログラム',
            subhead: '研修の全体像を把握しましょう',
            items: [
                '社会人に求められるマインドセット',
                'ビジネスマナーの基本（挨拶・身だしなみ）',
                '円滑な仕事を進めるコミュニケーション',
                '仕事の基本サイクルと時間管理',
                '振り返りと今後の目標設定',
            ],
            notes: '本日は大きく分けて5つのセクションで進めていきます。まずは心構えから入り、具体的なマナーやコミュニケーション術、そして実務の進め方について解説します。',
        },
        // ... (以下略、Webアプリ化に伴いテストデータは必須ではないが残しておく)
    ];

    const url = SlideService.generatePresentation(sampleData, { title: '新入社員研修' });
    console.log('Presentation created: ' + url);
    return url;
};

/**
 * HTTP POSTでJSONデータを受け取り、スライドを生成する
 */
global.doPost = (e: any) => {
    try {
        const jsonData: SlideData[] = JSON.parse(e.postData.contents);
        const url = SlideService.generatePresentation(jsonData);
        return ContentService.createTextOutput(JSON.stringify({ success: true, url })).setMimeType(
            ContentService.MimeType.JSON,
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return ContentService.createTextOutput(
            JSON.stringify({ success: false, error: message }),
        ).setMimeType(ContentService.MimeType.JSON);
    }
};

