import ShowToast from "../common/toast/Toast"

export function HandleNotif({ type, text }) {
  ShowToast({
    text,
    type,
  })
}
