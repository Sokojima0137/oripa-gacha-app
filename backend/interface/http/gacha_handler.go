package http

import (
	"net/http"
	"strconv"

	"gacha-backend/domain/gacha"
	"github.com/gin-gonic/gin"
)

//`NewGachaHandler`: Ginのルーティング設定を行う関数。
//引数:
//`r *gin.Engine`: Ginのルータ（エンジン）。ここにエンドポイントを登録。
//`svc *gacha.Service`: ガチャを引くビジネスロジックが定義されているサービス層。
// ＊はデリファレンス。ポインタの中身を取得
func NewGachaHandler(r *gin.Engine, svc *gacha.Service) {
	//c *gin.Context: Ginがリクエストとレスポンスを扱うためのコンテキスト。
	r.GET("/api/draw/:packId", func(c *gin.Context) {

		//Goでは、関数の戻り値が複数あることが多い
		//戻り値が int と error の2つあるため、それを同時に受け取るために packID, err := を定義
		// :=は宣言と代入を一度に行う
		packID, err := strconv.Atoi(c.Param("packId"))

		// ()はいらない
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid pack ID"})
			return
		}

		item, stock, err := svc.Draw(packID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"item":  item,
			"stock": stock,
		})
	})
}
