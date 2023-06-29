export * from './crypto'
export * from './locales'
export * from './router'
export * from './storage'

export const renderIcon = (icon: any) => {
  return h(icon, { 'stroke-width': '1.5' })
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const useWarningDialog = (onPositiveClick: () => void, onNegativeClick: () => void) => {
  const dialog = useDialog()

  function onClick() {
    dialog.warning({
      title: 'Confirm',
      content: 'Are you sure to do this action',
      positiveText: 'OK',
      negativeText: 'Cancel',
      onPositiveClick,
      onNegativeClick
    })
  }

  return { onClick }
}
