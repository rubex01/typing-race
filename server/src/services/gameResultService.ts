import {inject, injectable} from "tsyringe";
import {player} from "@/models/player";
import symbols from "@/symbols";
import {gameRepositoryInterface} from "@/repositories/contracts/gameRepositoryInterface";
import {resultRepositoryInterface} from "@/repositories/contracts/resultRepositoryInterface";
import {game} from "@/models/game";

@injectable()
export class gameResultService {

    constructor(
        @inject(symbols.gameRepositoryInterface) private gameRepository: gameRepositoryInterface,
        @inject(symbols.resultRepositoryInterface) private resultRepository: resultRepositoryInterface,
    ) {
    }

    calculateWPMForPlayerByStartTime = (player: player, startTime: Date, finishTime: Date) => {
        const secondsPassed = (finishTime.getTime() - startTime.getTime()) / 1000
        return  Math.floor(((player.getLetterIndex() / secondsPassed) * 60) / (5 - 1),)
    }

    playerFinished = (player: player, game: game) => {
        return player.getLetterIndex() >= game.getFinalLetterIndex();
    }

    storeGameResultIfPlayerFinished = async (player: player) => {
        const user = player.getUser();
        const game = await this.gameRepository.getById(player.getGameId());
        const startTime = game?.getStartTime();
        if (
            !user ||
            !game ||
            !startTime ||
            !this.playerFinished(player, game)
        ) {
            return;
        }

        const wpm = this.calculateWPMForPlayerByStartTime(player, startTime, new Date());
        await this.resultRepository.storeResult({
            userId: user.id,
            wpm
        })
    }
}