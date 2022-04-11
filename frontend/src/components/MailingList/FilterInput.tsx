import { NextPage } from "next";
import useLazySearch from "~/hook/useLazySearch"
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";

type Props = {
    handleSubmit: (word: string) => void
}
export const FilterInputComponent: NextPage<Props> = (props) => {
    const { searchWord, handleChangeSearchWord } = useLazySearch(props.handleSubmit);
    return (
        <Style>
            <TextField label="絞り込み" value={searchWord} onChange={handleChangeSearchWord} />
        </Style>
    )
}
const Style = styled.div`
    padding: 1rem;
`
export default FilterInputComponent