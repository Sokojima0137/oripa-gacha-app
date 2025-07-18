package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	gachaDomain "gacha-backend/domain/gacha"
	packDomain "gacha-backend/domain/pack"
	"gacha-backend/infrastructure/mysql"
	httpHandler "gacha-backend/interface/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db := connectDB()
	defer db.Close()

	// Gacha用 Service & Repository
	gachaRepo := &mysql.GachaRepository{DB: db}
	gachaService := &gachaDomain.Service{Repo: gachaRepo}

	// Pack用 Service & Repository
	packRepo := &mysql.PackRepository{DB: db}
	packService := &packDomain.Service{Repo: packRepo}

	// ルーティング初期化
	r := gin.Default()

	// 各HandlerにServiceをDI
	httpHandler.NewGachaHandler(r, gachaService)
	httpHandler.NewPackHandler(r, packService)

	// サーバー起動
	r.Run(":8080")
}

func connectDB() *sql.DB {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		dsn = "root:password@tcp(gacha_mysql:3306)/gacha_db"
	}
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("DB接続エラー: ", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("DB疎通エラー: ", err)
	}
	log.Println("✅ DB接続成功")
	fmt.Println("[DB] Connecting to:", dsn)
	return db
}
