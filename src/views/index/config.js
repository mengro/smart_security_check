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
}
export const alarmStatusMap = {
  1: {
    text: '无异常',
    color: '#47F939'
  },
  2: {
    text: '已处理',
    color: '#47F939'
  },
  3: {
    text: '遗留包',
    color: '#FF3652'
  },
  4: {
    text: '错拿包',
    color: '#FF3652'
  },
}
export const workStatusMap = {
  1: '待机',
  2: '工作中',
  3: '告警',
}
export const parseStatus = (item) => {
  const { alarmStatus, status } = item;
  if (alarmStatus > 2) {
    return alarmStatusMap[alarmStatus];
  } else {
    return statusMap[status];
  }
}