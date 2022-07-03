import LoginForm from "../../components/LoginForm";
import { CentralizedContainer, FullScaleContainer } from "./styles";

const HomeTemplate = () => {
    return (
        <FullScaleContainer>
            <CentralizedContainer>
                <LoginForm />
            </CentralizedContainer>
        </FullScaleContainer>
    )
}

export default HomeTemplate;