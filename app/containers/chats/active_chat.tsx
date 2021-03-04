import * as React from "react";
import {View, StyleSheet, Text, ImageBackground} from "react-native";
import {useDispatch, useSelector} from "react-redux";
// import { I18nContext } from "../../config/i18n";

import {RootStateType} from "../../redux/root-reducers";
import {
    changeMessage,
    chatProcess,
    doSendMessage,
    fetchActiveChat,
    getChatMessagesFromDb,
    setReceiveMessage,
} from "../../redux/features/chat/chat-reducer";
import IconTextInput from "../../components/text_inputs/icon_text_input";
import PrimaryBtn from "../../components/buttons/primary_btn";
import {FlatList} from "react-native-gesture-handler";
import {MessageModel} from "../../models/message-model";
import {SenderMessageType} from "../../redux/features/chat/chat-types";
import {createRef, MutableRefObject, useEffect, useRef, useState} from "react";
import {navigate} from "../../navigation/navigation";
import {MessageType} from "../../types/MessageType";
import MessageList from "../../components/chat/message_list";
import MessageTextInput from "../../components/chat/message_text_input_comp";


const ActiveChatScreen = (props: any) => {
    //HUB CONNECTION
    const dispatch = useDispatch()


    const chatState = useSelector((state: RootStateType) => state.chat)


    useEffect(() => {

        console.log(chatState.activeChat.chat_id)
        // dispatch(getChatMessagesFromDb(null))

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return ()=>{
            console.log("unmount")
        };
        //Get Users Chat Messages
    }, [chatState.activeChat.chat_id])

    console.log("Active Chat Screen Rendering")

    return (
        <ImageBackground
            style={styles.backgroundImageStyle}
            resizeMode="contain"
            source={{
                uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBcbGRcYFxgaGBoaGhoaFxgZGxgaHiggGBolHRoWITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGxAQGy8lICUvLy0tLy8tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIATMApAMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAADBAUAAgYBBwj/xAA0EAABAwIEBAQGAgIDAQEAAAABAAIRAyEEMUFREmFxgQWRofATIrHB0eEy8QZCFFJyFQf/xAAbAQADAQEBAQEAAAAAAAAAAAACAwQFAQAGB//EADARAAICAgIBAwIEBAcAAAAAAAABAhEDIRIxBBMiQVFhFHGBwSMyM5EFQlKxsuHw/9oADAMBAAIRAxEAPwD47h7mCQBneY9AbmIRKh+Y5ZnIyM9DqOcrVoAG4Pn226rym2dste6bx5KkVLWhvCWsT5zA92TLm5AQbaDlxHPOJjsl6Zi1p3z7I9Nk2zN/cq3GmoKLGR+wTjm3TTuhVr3mCAABGcQO1ro7qZjkM9ECt8oBAteCdcpjzCJuEVsbJOhYsOaMJ4cyRe2gi/3K0punM21y97LK3p79UrlGtAKLWzamDpI3P7RXgCZk2sRlIImdYie8ITXQI3IMef5W5cSBN9vr76IFIaloDwz3WjmWjr9kVsAxodTaJ1ttn2XmK4A6Kbi5sC5aAZj5hEnWRncdU1PQiSQOhTII+XMiCZiLaahbd+UrxwsCJ/GUHPcnyXtCiSQBrkkZFoZi7SSN+EnJHw9IzHsarG0YsSPOQekJrDjYwk006RZCF7YZ2EcAHEGHgkE6wYPqCt5/vLz3XhtbprP0Xokr0m10WY4oNRqH3+dEyKp16bxH2SbqgaguqSgU2tFOkMVK0GLLEq6qFiF39QeSIVItH8hOdstLHaJhaMGg12mB94XoF1sc7Dnaev7VUZJaR8zxb2zeibzkNFSwrwAflBJBF5i8XzzCm0XQbG+8BUaQ+XLlmR7uQeyOeVrSKfHj8muJflB0yvnOSVfSLhIBtEm+v0TQbIutakgEB0A5ic43QSuroa0n2KUackAZkxG/l2stmA75zbT92XjRBn8eoRMzaAb762j3uvVoTFGNyI+332R/hHh4tJixvJG2e/Ja0mWK2NOyPHBsZ0H8O8HfXMU2lx2AJ9EnjsC6m7heCCMwRkum/wAU/wAhfg3/ABGATlBFr6KL/lHjDsRWdUcAC4zbLyVbiox2JmlVkoZZ6+7bIlMx3Fh6SlhUR2kTpbrdTuVgQ7G6JBsc9DIAHUkXTLQABDiZAJtEHbn1tmlQRE26Tr3937JqiPlm/laNL9RlyU83qjSxLYUP0yPb7rG1yDkJE6T5hCLTkNbe+69pU0p6K4W3RtUOpWZguiBlbe0zyzOS8c2V45s+/ukKexzTAvmbZeysWPMWWJlInbJPCUWpoLWaMgepmdRMTyWzYyjT3K3DGg3urUmmYija7N8MLjiEgbzz2jdUHUoH9fUdkLBsbN8heM5M5GIgRz+qYcNlasUZK2Ng+KoWj/WBO8x32H7S1Upyq3bkl+GNO6CWJ2ecrNabbiQL6n9IlJhJJm9o5mY2iw6IvAOEEC99c+2lvovWmwHPnPQaa+gRLDXZ1MfxPhL6TGPdk8EthwMwSNOiTqM2PUQisqnLbdEZSGd8tF2VLURqVk2o3TLmTbl0SNRs5+arVaUm3lGkEk9vuksSLRpJyymBeND70U04y7ByRVCPD3+2UIz6nEeIwOQAaOzR00H1QwTcTY558ivOGDnKRIRGxwVSYnICw0j7mZT2GdIjKdzb+lKYcp97Jym6yS2+2aGCSsfbTWxZsJjbyHrAQ6QMAznoPvsiinZId9M0oLVoDUeRlqLobDv72R+G+XbyQi1Co2wZ2B4NyAsR2uKxO4iOInh8MMybxkjCiNfel7KiMNYyMlOrSPfZaEZ77M541GK0ePeG5QtW4r+o8h0QqhzJE7aIMEaI4yYmTaY82pIzQydB9ffNa0abzZo4oBda8DU9Mlvw8U8unvdG3Lo6to2pTymYifYhHYJI38kuyne/b0TWS85UvcHHrQY0jw6WGkbzfc8+i94IbMwLDMTvlsgMq3MzIyHvJBq1vf8AS480auhiNqjpyBNvzrokazt1R8OxDWOJdTD5a4QSRBIIn5ds45KdVNza+36U+TK6ClDVivDfefzt2RKbZMX5BomToj4YAEEgHce8v0sLIdIte2chSeps5HBSsEaUm3vf7pylRt6+99UJoTDXIZMrw40mMtGmfQJs5JOh6Izq6V9zSg0omVrkk3kkkobqZBzyOYy7HVb8RMToiECF2K2DJJijmrFmKqni/iG5W/u/Neqv2oibVnUYrACXW0XP+I4Yi9yb755/dd44iCLZLkfFqZDoAgrnOcnTJ1VHN12kaXRP+PaTH9380zTYDndZXp2Ec9dvZRqaSpdiXj22wFJzmfwdBcCDBIscwY05J3wvEnD1Q9gZVibObxNNtWnP9JBg4uXUgHtuURgF8+nvNBHyckX9jrhFoJJeTpcmBlp916T8ugv1t7Cyk7hvGhg3HWN81s+qTcm5J0vln66LnOU3bO8UkJSJynI6rTjuQRHuDmt6TheSP79YshYh0m2Q5Hz8z6r0ppMCPVhzUttpYAW97pWo5btMjstWNHzSYMWEZn7CNenZbmmUStpB8M2QmatKwtvrbttoswzYjmqWCxfBJAaZa5vzCbOEGAcjsUrmrNDFgXCmRmtEGZBi2ec3tG3RYKZlGe0yY999kdteGFo4YcQTaSImACbgXy1XVJMT6dM8aCRlG/f+lh7aRzi37WU3QF5WxDbQTJniFozkQRmPuFxNsa5RigtAAw0u4Z1OQ68l4XaJNuIF/fr2QxiT6ei7GNAy8iNBnPM+yvEtUxAm+fmsTSR5IHelxe6w7Tn0nVLYqjxnf3EJynTBOoC2dQaMiQZNrEAaa5pPjT2rYtslVPDAGl2ckRbW9j6qFjmXiMuS+t4T/ht8PJeZq5RHzcWY19wuA8SwDSZE7mGi3qq8sUmqAUrT/M5k/KDeARfmM/qAsoVeEh0AwQYORjSNU/i8KRkTyy03S2ImA0ukNnhIaLm2pAMW18ktX2gXW7BFw4ic5B0jMEWHmEGpVjp1TDG2mNr/ANc/ogYwXn0i3lsu8XVgSloTY+TNs9kSmw558jN/JeUWRrqLanP33HOH6VObKfI2hvjY+XYGnSOcR0FuUDNBeM7K27BObLS0ggwZtlpdTMX8sW1n3ySUney3Jj4wsxtgLj1t7+y3bW5+80g2pv2Rqbwf7uuSRzHn+gy14J3/AAh1H7C2knT7r0CLjLT+9c15VbL5DfltbkLXvMmPXRFFao5kk+zKjucgZxz5+aWcSi1GnLXKPRas39E1UiaTbZoG2JtYXHoDzvC9p0puTl76JinhSea8awgp718Axx7tmhp8l6gYmsS7LLr106rEv1JHnKFn0yrUgiMveyHiH6jPknquGkjWEpjKPzAD2VnYJNuwkCxWOc/MiRwC3IH8Lyo0OkgRxTYE27m5HVNUcAC6WtIaCM7xnYmBzTdWjnYDOIWjybBvZx+PpFszYhT2xIEgAiCSLDfS31V7H0uN5EgTe9hNz0E5bdFGeBsDaL9IsixSpnpRbEqj9JMXsMuRS5vG30TNRova/XXVDoUTnE52v59lRJ0K42zMPhjM7+vuyqUKEdkPDsvbafW+WSdc8Zb5qNqLdPs0MK4gartCVI8Tb3/FvoFSxTYi6WFEOuZ7dLeqVJNyKp+6PEjNbkdBtv8An8I4bBv3RquFg8p2S9QXjRdfZBwcO0NVawsBPMZQTY9bAXRA8AtMC3Ug3m4S1Bufv3dMFuS7QyLclbBVhJtqiU6QsY/vlZMU6QF46J1jGwDCdFBLDexeizySuLEuJ1Mk/dP/ABIytn9J1SGJqS63fLLJPpfU9kpRJFdnzFYmHCNG9wJWKdogeO2fYaDht7J9FsMCXElOUsInqFO6RBqMaRxy2TaWF4GklKPqgzOZPorPiJGSkVM5K88jXyMgr2QPE8OASYtrJ5fmVAxdMCRNx5Lp/E3cQic1AxmH+UkRM5XmNDlEIYSSK1HVkOq09YTWGp8ZGQEgE3gc5S9XM7C3598llOoY4e/dVrJGmT07KL6bGlwkEAmHNm8WkcitMI75ose9kNmFcTlayxoiY5JF2rXwNtqSs3x1O4E9o9+yj0cISIAkCTMAHK99RATAph/CZvF+Rvmj06EwNPPvCohG4N/I+MvcTK2HBkC/v+lKrYYyupxFAAkWMH7pWrh7AxJ9P6UjtFU8ayKyLh8GbbKhjcGKdg8PEAyJi4uL35JtlEDIIOLpWXU3VHY4VFWSnOKbpVLZX+q04BNzbWLfULw1ND71ttKbBfLE3QLFHSLpOqw3N7wPL9BOEB05gyIOnNAxWXvZOloRNXbZPdUcDYleLBUaMxPc/lYgSl9TPcl9T7rh8T81uiZe6ASAf2puHrAOuJTRqkTB/fmsvn7KDcNm/EHC6jeIvE2Tr6hA+ql4p4BKW8mirDj2IYk57qLWdJJMxy+wVss4w45QJzAzMW3zUrE4abX3KP1A8kq0iR8Lki0cPBDjl+NPoqDqAa3dKxCZHIwKQ42qIsbX09+wpeIpwSdCnGMdHLNK4t8wOqrwtJHsi5I3pYgWgnLX31VgcDCOB/FYT8sXi4zII5rnHCDsPeio4GkWic+fVPxyuHE9F0+irwcRFtPfqmn4ccJGfQLXwuB/LdVWURwyUHA0ITpEU4aGyomOxFyALe/NdBj3x8sx7lctjnXIRca2ezS9gs+uBkENlpnMevkt2U5BEd7yPc+i2FCL5riaRGoSlswuIibC2X1jVJ13cRsBO2cn3rkmzTc8w0EmQCdEdlJtPSTqdeg5J0lSSAac7+hHb4YTckArFRbiBqCe8ekFYkX9wfw+H6H1Fwg+/sjUjPVFr0Jy681rh6U5L51trRzTVgsRRdYRPFkFzuJBJJyHv33XSY+qIgZjVc3jMjAsPquuQ/ExSnVk8MKk4DIAG1yROf3UvDCJJ9+7qqypwtEZnf0+/mnxeqAlHk7EcYwSQ31SZogDIz7j7qi8iCbWSeIrAEyJ7/dHGSuhijWxMv4RkpDny4nyCp1GlwzS58Pdow6FX4lcRGSVMAWyQXeiq4J4gD35pP8A4hAkomENjy9/hUQ09nIv3L7lxjMj/arMNoIgRuo9GpIBCc49I0RWjShGyY9zXOdPvdSMVSib52I7z9YKtspni4pgkgDS+l9Oqm+Ic7z6fldTcVY3LBOIixjhcbGUTA4c1Dwxf/toBeepyQadeTAz96q/4TQDKXESPmAPTkqIuEuiJRl9QdfBtY2ABGp1/tQse4fflG3LVXMe/iEZe7qLimBvPSbZzMwei5P+U9ll8IhveZ18liPWEGAR6rFPwRnNuz7cGWLhlqNQdQivpGmziuCbDmCvMG0tccoGYORHvVMeJ+LNqcPEwt4RlaPMLDnGKV3s65O6+DnMaCMtfqlPhERNyDMc81UxNQATYbJCtiwT8o7qbSZSnYq/BZk2bJLW7A+/RTfEsYGkRHKdU/i6j8ibahc/4hS4rjNPx1dsdBWGb4hFxGRtA1+qScTnvmlWui3WD+lsbxfttyT4qmMnHRYwD2vc1lhJHuy+seB+AUzQvFwJ7ZL45gfkM273565LuvCv8jcynwzorsEktGX5eOcknHQj/leH+FxhhjQxqOa4mm/hN11Hjniwe10gSdbz2XF4qrJJy5SjnrYcG4pWzo/DqnyAgyreFqi5LQ4QbHciNDouQ8Ir/LGxldNgHAgztl6ruOdyo18PuxJgcYwBnVQvEq/EC0ASTMyZAyjbVdBjgAGmexuuZxsySdLd1f6akqQPk5OMLEjhSHNB/wBog94/K69rPla0ch5BcvgMSDUY0yYc425iCfQeXJdD/wAgA2990MMavRNhyLi2gHiT+EQbGT2jTeVzznF7oDeJxMAC5J7ZlVfEKxLjket+f2UZxIuCAbkXiIE+aZOF7+CXLl+Bd1Qg5BeINSpfVYl1RE577Pt2LxhbGskLelUDxKlkOLgTOpTlMcDZBzXyUs1stcEgWMoTM6fZK06XDOV49PoqBqSIQsRSPClLvQcX8M57xasZtmSljgyWcWe/cxdNV6BJ59PVFI4RA79M1RB0qLIKqo5nF4Ug6hB+ARdXMRTLtDc/0j4sH4IolrRDiZj5srgnOOStgmxklZEoPJcBYdbBbPrub9V6aUaJTG1YbfsnLQmcKjs0xWMMX5wpTqi0e92XuEItyTvgy5ttljBVQ1rQHSXE8Q4YiMvm1mTtkF03hWInuuKw93AZc10+CHCSAZAPO/RDGdTs2/8AD03ja+Cnj6kt5g5hcr4hVBMeYXT4LEF1VscBIMw8gNMXg8VlwviGJl5Ns1fjyW7J/wDE8ihHibYV5NQEb337K8+rzXMYXElr5BIJ2MSDmOhGmq6H44ePl9nqmwk+XZneNNcGvkDXqcvc5qfi3x1nO8xl0TrqZ4hI6b/pTMUCXRtb9IlJvQHkajYo8mVio0ME4tHyTz38/LssTFikQ8Gz6yyZtvHlmmMTThsleeGsgiJIz87+ScxPzOveSvhKs2G6kJYVhPLf7ItZkyJRqtIgQJnol2OsUSg0EvdsSrYZzieEZRI5cpN9EXCYHMESTeSE3hKdwnHi5K0vHwpq2G5taRy2OoxYZifRIYl5iCdBrO4C6Svhxc6/Vc34lTIyGefJWqFI0MNSJOKMW+imVmjVUcXUEzEnJJvYJ3P68t0phZYIm1aWs56LRmGHCTa2k3TNa5v/AEtLDWfcL3JknoRu2jWg2ARPQKvRqQ3Mduam02zt72RKmNDBFzIixA/OsWRpOQzHkjgTYLxPFRMHyUP4lwczqj4quH9Z59/slBny3OfdV41xRg+Zn9XJZjhJNlW8McbAuDQYEnLvGiQqcMWz+3T96rz4toy9LZd0yLaEQlwlZX/+k8VQ6nJcCC2BNxlbXJanEF7yX2dO0Xm87aqXTJ0J5Z/X3misaZGZPrKNX2N9aT7H/jHdYlKdZrbFrXayS/bIcJiFieo6Aec+pYDxJ7Y4mGTqMtldwGI4ySNB9UhiKIFsiLDY998l7gcTDwJAJ0Xw2N7NycFNWkXH4cuAmUjWw3DIPorYqCBzU7xGo1slaWPCm7JMUm3R5gmAONgbR0O6FVfoh4epALpzU+u5znW1/paWONIqhjuTHZ4stlE8ZYLjlnurlJ4Y0k6ewue8Vr8R0VPG4lPjJ8/sc7UoGSkK7eoH4yVh9/yieH+HGs4EiGCOJxygZgbkhS+k70XZeKjsiNwrnCYJnX3mtKuB1NuWa7PxMh7iGNAaMknU8GgFzjax/XVH6FEMsqaqjnPhNb+0njWsOQPn9LK7V8PvYSB1gwk8VghbiPy2JIz590Sh8ImyttbOZdDSHFudwL5SRM9QUtxx6/TVWvFcI2mbX4gC2CD8p0ds4WkKXWZOg6ba/lUqOjCzKn2YBIiLWn1WU6V4yB1iSBy52jvzXlEHP3/eaZYzc6bJkMbYu0eMECJBGYtfaD5DkmHObJhoFgIvnYSL5kz5rzDhnzcToMWtMnQct5Qna381bjhSAlMEcM45AnoF4iFuxtzWI/TX0FWfb8Y9sENA85PZcljcQ4VBwTmDfkuoxJDjNo5HyPmg4bBt4+NxEjJq/PseNzlo+uwTWNW0WqVUFjTIAtzjyUHxfGFzg1u+2mpVGvQj5pjYfpRqgPHxRAK3MePQPj443yKjsQ5zOHIG5yz36qSBww6I6/VNiplGmqBjIcIB5wqFFjsap18GtTE/J5EqRW4qtSABOwy5JijTfVcWM1FycgNzsjCrTojhbc/9tSmcv7FUUoaXZrS8MZT+aqQ4/wDSYA/9b9AiPxo0FsgBkOgU/E4kuMyncBhAYJMNzO55Lqd9CskW9zY1hKBPzRzJKVx+La93CLtHvuSmfHMcIa1vkLdlCxDvhAE/yPTLdFLRKl8sLjMbw2FrZBRMW4vyJAsSb6a9skLF4sznfz89ygMrS2J9/Zdwe6VkudqqNQGzBIkkXIERN7m3nsp2IojitFwO248/snq1NnD/AC+YnKDlG/UoIs4QRvnlt7/CvULMnL9xZ9MNMX+3kiilOfPUbSvRS4tRYib5z6xY36bp3B4G2pMHW38T5qrFhbJpNWSa7Ydw3sb3HTmtC0CLye+/4VirhnN42cIvrAMXBiYvl7kpRuEvr5Ji8eV9CnJfDECw6LE8cMN48/s0rEz8OL5HXf8AKcDc84zunMHjjxgk5C99FJqkErA4bL8/xw4uz9Nlii10dc3xMEOdNhkDdDbiwf5C652lTmFcw9IkEXWvguS2RZMMIB6VechY2QqVJz3cExe/LmjU6PDbMpvC020weL+bo9zsqVARKainxBYjDup0HmmPkaRLv9jO587Lj8djZdbyXS+IuBBZP8vqcrbqIfC+A8byOLQHTrzSsuOcnSKPHfGLb7YKhVAEv7g5805R8UmT/r+slG8QpCDdJ4apAgkiMl1Jwf2ByTt0yy2v8SsHE5X8kt4tig90m2yDgpHEbZau4YuLic+n4SGIAc602HzSczOiZGLar6kWfIl0BqkHaUo+oBeddDp2+qPVGfdI1BOQ657+mifDDVGPnymNrn39Pe6KXZei0ZTHbp6ZZotOleXEADS/la8K/FD4ZnSbY1gMM5xhok/tfR/A/wDFHNph9QieF3yn/wAm52Ur/AfDGudxDhJvoXcOxgjdfSfA/CQ/4grvuDYSRbfmFTmyxwxpEri5vfR858VYyjIe4cX/AFaZIuM+0+a5jFYhrZgWOWSuf5Wyk2rUHxGkSeD+eUxNgZsCuNquYJPHkLWNzsZAIbE81U8yhC2c/DuDqzarWy5hepB1QcvosSPxK+oXFncU6XFn+lWw/hTCCZiIgRJO99EDCMc0EwHA5255cv0qeHIfIFjrK+RxYY/J+iZssvhgaWGa2deaNg6pvGuybw+G4CS68A/Kkn+I8JkRlb1V8YKJNbnaWy3ho4OJ4DbmDqcudhZTcdiBUvk0apSti3AB1T+M5alT8V4u54PCAG5CNAnULhi4ysMazGGSeg/WikYjFlzj6INfLO5+i0o05BvfqgcJT0kOc1FmuJyUivJMgmw09FUYy5H9d0F9EE5Ivw+/cTZm5rQvTq/IQ4kc45IDq4GS08RdwkjTPzS1Ml0Abi5IgeiphiWtbRkZ87T4oNTrEm5MbC3MJkYcySTci3TK8aoWGw8G+mqpOAJEnLOPVVY8SZK742wOGocIyB/SSJaDa/e5PLcW+ip18SGAubtbfqucq4p0kk5md+/Vc8nIsVIQ2dj/AI1/kzcHOrnRYfclXMb/APo9J8NNIuIDvmDoIAa60i6+UPqF15kyeuiIzMyf9Xd5ae6gl5spPpHEldo6f/JfFsO6HUwSXX5N/K5ipiZybcCTmecnYZL2oAKYIqCXSCyHSAMjJEEEga6clO+uv65pWby8mR2DN0xh+J5rFlLCFwmQsQqGZqwD7jgK7XjhGnoUw4spkH/Z0wPvzXONrFrpBzz27pfHlzqgguIE53gAwOgScbcVdH3D8a5d6KmLxZbLrmQR0S9OgGD4j89B9+Z/Cn1McA4cXlp9ETxDFB4PEYAiAMlTjafQ1xcVS/UUxdc1CZcQEphsQ4S0iwz1CxwccgTtsEkcZwGIn/tAPbrqmKr9xLlnxal0HxeLuQ3X3AXcf4V4fhxSL8UC1pBLXEWMc9br56cRxCeGBz95pfxDxStwBpe7hE8LJMCc1ZUIwoyvLyN3K9f2HvHfE6bKjvhmWyY6JKp4hxtltvTJQXOLrQTJtfXW3Oycq4ctAGsC02U7TyS9pJHzsrUm+g1GlILnERPco2D/APQj6KdVeQIle4SrBAkX9Lxeck7E4437yeWW5JRR1WHoiNOVvdkLFVmtmbxn7ClDxKGkTB0i/rPVLYjEm0mQYJ7qmXk44r2hTnaCYrFFwkGBfXrtyKmPqGLSI180StUkWyvAJHub/VeMdmJ66yRl/ays+TnImasE35XfM2YP8TI7GIPktPiCbZXz73TXwhEWk5Xy1nrH1XtPAucb6fQCElYJydRRzfQu0AiDnPTbfutaVEl24Gd9uapjwtggucZ2Eff8ryqwNkNEbqmPhT/z/wDYDZ6MK3R3rKxTi46LxOWSH+kHkj6bTAkbEg7++idpu/k6NwN03hsCCGmBI93Wvih4YEzP1N0mGHij755VKXFHP4loDrqdXxeYm+k5FPY6mXElQsW0A6yp3JwlXwe8qTUdFXwTGFnFLZNhB0nUIeNYwvBGZnNJ02PlovAuTkOfX7SmcKAXcRziAP0n+5xRPj2lBo3xOELmwTHTVTX0WN5neMlbr4hkc8t4UPxF0CI1znTZOcnWhPmQxxufdC/CBJzWYqkBF5JSzASSZ3svS+4k6KvDDjGz5/JmjJVX5fuGr0ZsbndTn4eDHqq2FaH7g6HpugYnDGf5ewlTjGaO5cNpSS0KtIiC48hOtrxuUEuG3n+lvUp35nb8Ba8LeK7i0QbxJmMoGhNlFl0ifd0DDxBEC8X1ETkdOaI0BsH669QLhaFv6/K3Zh3EkkFKhGUnpWD0He5pEix2THh1WROXDaTz9laYTBg/yMAyZicp78kN7OGR5RYd7XWhiU4y5NHJp1YXE4kHOQTFhqNb6eRSzqwvBtpKE+57Ibl7Jlk2Tsw1NwsWfDKxJ95w/QODYOEmLhpXN+JtHE7kVixMR9t4z/iMkeKCMkoykLWzJnyCxYkzS9U0BPxOu4FlMGGP/kN+Egj1RHD5idvsLLFiZk/YhX9Sb+6/4ibD83l6hG8ZpANsM16sQ4kBP+jMjGwtzS1IS8TyXqxVR6/U+dzfzIYw+iNj8x/5afMCVixLl8lC/pE2oPmXj2i6xYo5ktIo+D4drviS0HhAjl8wTdQRML1Yq/F6f/vgrpejD9f92asaDbml/F2D4hEAC2VlixUvtfkybMv4L/NfuRSvWhYsUr/mM0KF4sWJ4J//2Q==',
            }}>
            <View style={styles.mainContainer}>
                <ImageBackground
                    style={styles.backgroundImageStyle}
                    resizeMode="cover"
                    source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWE4_Pq1TW-gQyYrNFlhA5WicDRA922ju-aQ&usqp=CAU',
                    }}>
                    <View style={styles.topContainer}>
                        <Text  style={{color:"white"}} >Chat with {chatState.activeChatFriend.username}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.middleContainer}>
                    <MessageList allMessages={chatState.allMessagesForSelectedChat}/>
                </View>
                <View style={styles.bottomContainer}>
                    <MessageTextInput/>
                </View>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImageStyle: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    middleContainer: {
        flex: 10,
        paddingHorizontal: 2,
    },
    bottomContainer: {
        flex: 0.8,
        paddingHorizontal: 3,
        borderRadius: 50,
        marginBottom: 10,
        marginHorizontal: 4,
    },
});


export default ActiveChatScreen;
