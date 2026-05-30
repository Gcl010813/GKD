import { defineGkdGlobalGroups } from '@gkd-kit/define';
import * as appList from './globalDefaultApps';

export const OPEN_AD_ORDER = -10; // 开屏广告

export default defineGkdGlobalGroups([
  {
    key: 0,
    name: '开屏广告-全局',
    desc: '关闭打开应用时的开屏广告',
    order: OPEN_AD_ORDER,
    fastQuery: true,
    matchTime: 10000,
    actionMaximum: 2,
    resetMatch: 'app',
    forcedTime: 10000,
    actionCdKey: 0,
    actionMaximumKey: 0,
    priorityTime: 10000,
    disableIfAppGroupMatch: '开屏广告',
    rules: [
      {
        key: 0,
        // 防止误触
        excludeMatches:
          '([text*="搜索" || text="历史记录" || text$="在搜"][text.length>3 && text.length<7][visibleToUser=true]) || ([text="Submit" || text*="阅读并同意" || text="书签" || text="NEXT"][visibleToUser=true]) || ([text$="设置" || text$="选好了" || text^="下一步" || text^="完成" || text*="跳过片"][text.length<10][visibleToUser=true]) || ([text^="选择"][text*="偏好" || text*="兴趣" || text*="喜好"][text.length<10][visibleToUser=true])',
        anyMatches: [
          '[text*="跳过"][text.length<10][width<500 && height<300][visibleToUser=true]',
          '@[name$="View" || name$="LinearLayout"][clickable=true][childCount<2][width<300 && height<200] - [text="互动广告"][visibleToUser=true]',
          '[childCount=0][visibleToUser=true][width<500 && height<300][(text.length<10 && (text*="跳过" || text*="跳 过" || text*="跳過" || text~="(?is).*skip.*") && text!*="视频" && text!*="片头" && text!*="片尾") || (vid~="(?is).*skip.*" && vid!~="(?is).*video.*" && vid!~="(?is).*head.*" && vid!~="(?is).*tail.*" && !(text="帮助") && !(text="取消") && !(text*="退出")) || id$="tt_splash_skip_btn" || (desc.length<10 && (desc*="跳过" || desc*="跳過" || desc~="(?is).*skip.*"))]',
        ],
        snapshotUrls: [
          'https://i.gkd.li/i/21617612',
          'https://i.gkd.li/i/23557410',
          'https://i.gkd.li/i/13421452',
          'https://i.gkd.li/i/24097095',
          'https://i.gkd.li/i/24766641',
          'https://i.gkd.li/i/24330969',
          'https://i.gkd.li/i/24541384',
          'https://i.gkd.li/i/24588777',
        ],
        excludeSnapshotUrls: [
          'https://i.gkd.li/i/15079224',
          'https://i.gkd.li/i/17108010',
          'https://i.gkd.li/i/18265000',
          'https://i.gkd.li/i/19952277',
          'https://i.gkd.li/i/20946730',
          'https://i.gkd.li/i/20949002',
          'https://i.gkd.li/i/21617520',
          'https://i.gkd.li/i/22634992',
          'https://i.gkd.li/i/23051921',
          'https://i.gkd.li/i/23742770',
          'https://i.gkd.li/i/23743049',
          'https://i.gkd.li/i/23052289',
          'https://i.gkd.li/i/23122415',
          'https://i.gkd.li/i/23225609',
          'https://i.gkd.li/i/23741801',
          'https://i.gkd.li/i/23741779',
          'https://i.gkd.li/i/25039297',
        ],
      },
      {
        key: 1, // 字节 SDK
        anyMatches: [
          '@View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0] <n FrameLayout[childCount>2][text=null][desc=null] >(n+6) [text*="第三方应用" || text*="扭动手机" || text*="点击或上滑" || text*="省钱好物" || text*="扭一扭"][visibleToUser=true]',
          'FrameLayout > FrameLayout[childCount>2][text=null][desc=null] > @View[text=null][clickable=true][childCount=0][visibleToUser=true][width<200&&height<200] +(1,2) TextView[index=parent.childCount.minus(1)][childCount=0][visibleToUser=true]',
        ],
        snapshotUrls: [
          'https://i.gkd.li/i/19685971',
          'https://i.gkd.li/i/19701216',
          'https://i.gkd.li/i/20262130',
          'https://i.gkd.li/i/20768349',
          'https://i.gkd.li/i/20883248',
          'https://i.gkd.li/i/23549504',
        ],
      },
    ],
    apps: [...appList.openAdBlackListAppIDs]
      .map((id) => ({ id, enable: false }))
      .concat(
        [...appList.openAdWhiteListAppIDs].map((id) => ({ id, enable: true })),
      ),
  },
]);
