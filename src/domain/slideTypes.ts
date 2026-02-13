/** 共通ベース */
export interface SlideBase {
    type: string;
    notes?: string;
}

/** タイトルスライド */
export interface TitleSlide extends SlideBase {
    type: 'title';
    title: string;
    date?: string;
}

/** アジェンダスライド */
export interface AgendaSlide extends SlideBase {
    type: 'agenda';
    title: string;
    subhead?: string;
    items: string[];
}

/** セクション区切り */
export interface SectionSlide extends SlideBase {
    type: 'section';
    title: string;
    sectionNo: number;
}

/** 左右比較 */
export interface CompareSlide extends SlideBase {
    type: 'compare';
    title: string;
    subhead?: string;
    leftTitle: string;
    rightTitle: string;
    leftItems: string[];
    rightItems: string[];
}

/** ピラミッドレベル */
export interface PyramidLevel {
    title: string;
    description: string;
}

/** ピラミッド図 */
export interface PyramidSlide extends SlideBase {
    type: 'pyramid';
    title: string;
    subhead?: string;
    levels: PyramidLevel[];
}

/** カード項目 */
export interface CardItem {
    title: string;
    desc: string;
}

/** カード型箇条書き */
export interface BulletCardsSlide extends SlideBase {
    type: 'bulletCards';
    title: string;
    subhead?: string;
    items: CardItem[];
}

/** プロセス手順 */
export interface ProcessSlide extends SlideBase {
    type: 'process';
    title: string;
    subhead?: string;
    steps: string[];
}

/** 三角形ダイアグラム */
export interface TriangleSlide extends SlideBase {
    type: 'triangle';
    title: string;
    subhead?: string;
    items: CardItem[];
}

/** ヘッダー付きカード */
export interface HeaderCardsSlide extends SlideBase {
    type: 'headerCards';
    title: string;
    subhead?: string;
    columns?: number;
    items: CardItem[];
}

/** サイクル項目 */
export interface CycleItem {
    label: string;
    subLabel: string;
}

/** サイクル図 */
export interface CycleSlide extends SlideBase {
    type: 'cycle';
    title: string;
    subhead?: string;
    items: CycleItem[];
    centerText?: string;
}

/** ステップ項目 */
export interface StepItem {
    title: string;
    desc: string;
}

/** 階段式ステップ */
export interface StepUpSlide extends SlideBase {
    type: 'stepUp';
    title: string;
    subhead?: string;
    items: StepItem[];
}

/** 締めスライド */
export interface ClosingSlide extends SlideBase {
    type: 'closing';
}

/** スライドデータのユニオン型 */
export type SlideData =
    | TitleSlide
    | AgendaSlide
    | SectionSlide
    | CompareSlide
    | PyramidSlide
    | BulletCardsSlide
    | ProcessSlide
    | TriangleSlide
    | HeaderCardsSlide
    | CycleSlide
    | StepUpSlide
    | ClosingSlide;

/** プレゼンテーション全体の設定 */
export interface PresentationSettings {
    presetName: string;
    themeColor: string;
    fontFamily: string;
    footerText: string;
    outputFolderUrl: string;
}
