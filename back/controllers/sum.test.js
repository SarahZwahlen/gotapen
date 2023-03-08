import sum from "./sum.js"

test ("adds 1+2 equal 3", () => {
    expect(sum(1,2)).toBe(3)
})

test("add other", () => {
    expect(sum(2,4)).toBe(6)
})