import working from '@/assets/images/device_status_working.png'
import waiting from '@/assets/images/device_status_waiting.png'

export const deviceStatusMap = {
  1: {
    text: '空闲',
    color: 'rgba(45, 255, 149, 1)'
  },
  2: {
    text: '检测中',
    color: '#FF9F2D'
  },
  3: {
    text: '告警',
    color: '#FF2E51'
  },
}
export const statusMap = {
  1: {
    text: '归档中',
    color: '#FF9E2A',
  },
  2: {
    text: '已归档',
    color: '#47F939',
  },
  3: {
    text: '告警',
    color: '#FF2E51'
  },
  4: {
    text: '告警',
    color: '#FF2E51'
  },
  5: {
    text: '告警',
    color: '#FF2E51'
  },
}
export const colorMap = {
  1: 'FF9E2A', // 安全
  2: 'FF9F2D', // 警告
  3: 'FF2E51', // 异常
  4: 'FF2E51', // 危险
}
export const workStatusMap = {
  1: '工作中',
  2: '待机',
  3: '告警',
}
export const workStatusIconMap = {
  1: working,
  2: waiting,
}
export const parseStatus = (item) => {
  const { status } = item;
  return statusMap[status]
}