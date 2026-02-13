import { SlideData, PresentationSettings } from '../domain/slideTypes';
import { updateConfig, GLOBAL_SETTINGS } from '../config/slideConfig';
import { addFooter } from '../utils/slideUtils';
import { generateTitleSlide } from '../generators/titleGenerator';
import { generateAgendaSlide } from '../generators/agendaGenerator';
import { generateSectionSlide } from '../generators/sectionGenerator';
import { generateCompareSlide } from '../generators/compareGenerator';
import { generatePyramidSlide } from '../generators/pyramidGenerator';
import { generateBulletCardsSlide } from '../generators/bulletCardsGenerator';
import { generateProcessSlide } from '../generators/processGenerator';
import { generateTriangleSlide } from '../generators/triangleGenerator';
import { generateHeaderCardsSlide } from '../generators/headerCardsGenerator';
import { generateCycleSlide } from '../generators/cycleGenerator';
import { generateStepUpSlide } from '../generators/stepUpGenerator';
import { generateClosingSlide } from '../generators/closingGenerator';

/**
 * JSONデータからGoogleスライドプレゼンテーションを生成するサービス
 */
export class SlideService {
    /**
     * JSONスライドデータからプレゼンテーションを生成する
     * @param jsonData スライドデータの配列
     * @param options オプション設定（タイトル、デザイン設定など）
     * @returns 生成されたプレゼンテーションのURL
     */
    static generatePresentation(
        jsonData: SlideData[], 
        options: { title?: string; settings?: PresentationSettings } = {}
    ): string {
        // デザイン設定の適用
        if (options.settings) {
            updateConfig(options.settings);
            if (options.settings.footerText) {
                GLOBAL_SETTINGS.footerText = options.settings.footerText;
            }
        }

        // タイトルの決定
        const presentationTitle =
            options.title ||
            (jsonData.find((s) => s.type === 'title') as { title?: string } | undefined)?.title ||
            'Generated Presentation';

        // プレゼンテーションの作成
        const presentation = SlidesApp.create(presentationTitle);

        // 各スライドを生成
        jsonData.forEach((slideData) => {
            SlideService.generateSlide(presentation, slideData);
        });

        // 全スライドにフッター適用（タイトルスライドを除くなどの条件分岐も可能だが、一旦全てに適用）
        if (GLOBAL_SETTINGS.footerText) {
            presentation.getSlides().forEach((slide, index) => {
                // タイトルスライド（通常1枚目）にはフッターをつけないのが一般的だが、
                // type='title'で判定するほうが安全
                if (index === 0 && jsonData[0]?.type === 'title') {
                    return;
                }
                addFooter(slide, GLOBAL_SETTINGS.footerText);
            });
        }

        // 最初の空白スライドを削除（SlidesApp.create() で自動生成される）
        const slides = presentation.getSlides();
        if (slides.length > jsonData.length) {
            slides[0].remove();
        }

        // 指定フォルダへの移動
        if (options.settings?.outputFolderUrl) {
            try {
                const folderId = SlideService.extractFolderId(options.settings.outputFolderUrl);
                if (folderId) {
                    const file = DriveApp.getFileById(presentation.getId());
                    const folder = DriveApp.getFolderById(folderId);
                    file.moveTo(folder);
                }
            } catch (e) {
                console.warn('Failed to move presentation to folder:', e);
                // エラーでも処理は続行し、ルートに作成されたままURLを返す
            }
        }

        // URLを返す
        return presentation.getUrl();
    }

    /**
     * フォルダURLからIDを抽出する
     */
    private static extractFolderId(url: string): string | null {
        const match = url.match(/[-\w]{25,}/);
        return match ? match[0] : null;
    }

    /**
     * スライドデータのtypeに基づき適切なジェネレーターを呼び出す
     */
    private static generateSlide(
        presentation: GoogleAppsScript.Slides.Presentation,
        slideData: SlideData,
    ): void {
        switch (slideData.type) {
            case 'title':
                generateTitleSlide(presentation, slideData);
                break;
            case 'agenda':
                generateAgendaSlide(presentation, slideData);
                break;
            case 'section':
                generateSectionSlide(presentation, slideData);
                break;
            case 'compare':
                generateCompareSlide(presentation, slideData);
                break;
            case 'pyramid':
                generatePyramidSlide(presentation, slideData);
                break;
            case 'bulletCards':
                generateBulletCardsSlide(presentation, slideData);
                break;
            case 'process':
                generateProcessSlide(presentation, slideData);
                break;
            case 'triangle':
                generateTriangleSlide(presentation, slideData);
                break;
            case 'headerCards':
                generateHeaderCardsSlide(presentation, slideData);
                break;
            case 'cycle':
                generateCycleSlide(presentation, slideData);
                break;
            case 'stepUp':
                generateStepUpSlide(presentation, slideData);
                break;
            case 'closing':
                generateClosingSlide(presentation, slideData);
                break;
            default:
                console.warn(`Unknown slide type: ${(slideData as SlideData).type}`);
        }
    }
}
