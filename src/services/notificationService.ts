// Local notification service for departure reminders

import { getProfile, getChecklist } from '../store/userStore'

const LAST_NOTIF_KEY = 'ctg_last_notification'

export function checkAndNotify(): void {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const profile = getProfile()
  if (!profile.departureDate) return

  const lastNotif = localStorage.getItem(LAST_NOTIF_KEY)
  const today = new Date().toISOString().split('T')[0]
  if (lastNotif === today) return // already notified today

  const dep = new Date(profile.departureDate)
  const now = new Date()
  const daysUntil = Math.ceil((dep.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  // Check milestones
  const milestones = [90, 60, 30, 14, 7, 3, 1]
  const milestone = milestones.find(m => daysUntil === m)

  if (milestone) {
    const checklist = getChecklist()
    const incomplete = checklist.filter(i => !i.done).length

    new Notification('China Travel Guide', {
      body: `出発まであと${milestone}日！未完了タスクが${incomplete}件あります。`,
      icon: '/icon-192.png',
      tag: `departure-${milestone}`,
    })
    localStorage.setItem(LAST_NOTIF_KEY, today)
    return
  }

  // Weekly reminder if checklist has urgent items
  const dayOfWeek = now.getDay()
  if (dayOfWeek === 1 && daysUntil > 0 && daysUntil <= 90) {
    const checklist = getChecklist()
    const vpnDone = checklist.find(i => i.id === 'vpn')?.done
    if (!vpnDone) {
      new Notification('China Travel Guide', {
        body: 'VPNの設定を忘れずに。中国入国後はセットアップできません。',
        icon: '/icon-192.png',
        tag: 'vpn-reminder',
      })
      localStorage.setItem(LAST_NOTIF_KEY, today)
    }
  }
}

export async function requestPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false

  const result = await Notification.requestPermission()
  return result === 'granted'
}
