import defaultSettings from '@/settings'

const title = defaultSettings.title || 'at-dingtalk-robot'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
