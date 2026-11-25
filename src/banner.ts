export interface Banner {
  title: string
  message: string
  couponCode: string
}

export function couponBannerFor(couponCode: string, percentOff: number): Banner {
  return {
    title: `Save ${percentOff}% today`,
    message: `Use code ${couponCode} at checkout before midnight.`,
    couponCode,
  }
}
