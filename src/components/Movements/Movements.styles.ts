import styled from 'styled-components';
import { device } from '../../constants/mediaQuerys';

export const TableWrapper = styled.div`
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    & img {
        width: 200px;
        margin-bottom: 20px;
        @media ${device.tablet} {
            width: 125px;
         }
    }
    & .info-logout{
        display: flex;
        justify-content: space-between;
    }
    & .logout-button{
        height: 32px;
        @media ${device.tablet} {
            display: none;
         }
    }
    & .logout-button-responsive{
        height: 32px;
        display: none;
        @media ${device.tablet} {
            display: block;
         }
    }
    & .table {
        display: block;
        @media ${device.tablet} {
            display: none;
        }
    }
    & .description {
        margin: 30px 0;
    }
`;

export const UserInfo = styled.div`
    width: 200px;
    border: 1px solid #17307b;
    border-radius: 4px;
`;

export const CardWrapper = styled.div`
display: none;
@media ${device.tablet} {
            display: block;
         }
`