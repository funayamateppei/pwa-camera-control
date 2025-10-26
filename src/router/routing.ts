export const Routing = {
  Camera: (() => {
    const relative = 'camera'
    const path = `/${relative}`

    return {
      relative,
      path,

      // この下のようにネストしたルーティングも定義可能
      // Test: ((parentPath: string) => {
      //   const relative = 'test'
      //   const path = `${parentPath}/${relative}`

      //   return {
      //     relative,
      //     path,

      //     Test2: ((parentPath: string) => {
      //       const relative = 'test2'
      //       const path = `${parentPath}/${relative}`
      //       return {
      //         relative,
      //         path,
      //       }
      //     })(path),
      //   }
      // })(path),
    }
  })(),
}
