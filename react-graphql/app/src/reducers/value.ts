import produce from 'immer'

type State = {
    num: number,
    num2: number
}

const initialState: State = {
    num: 0,
    num2: 0
}

export const CHANGE_NUM = 'CHANGE_NUM' as const


export const changeNumAction = (num: number) => ({ type: CHANGE_NUM, num })


type Action =
    | ReturnType<typeof changeNumAction>


const reducer = (state: State = initialState, action: Action): State => produce(state, (draft) => {
    switch (action.type) {
        case CHANGE_NUM:
            draft.num = action.num
            draft.num2 = action.num
            break
        default:
            break
    }
})


export default reducer