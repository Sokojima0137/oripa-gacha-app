package gacha

import (
	"errors"
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

// 構造体の定義
type Service struct {
	Repo Repository
}

// 関数の定義はfunc (レシーバ) 関数名(引数) 戻り値 {}
// 戻り値は複数可能
func (s *Service) Draw(packID int) (*Item, int, error) {
	fmt.Println("packID: " + strconv.Itoa(packID))
	items, err := s.Repo.FindAvailableItems(packID)
	fmt.Println("[Draw] 候補数:", len(items))
	if err != nil || len(items) == 0 {
		return nil, 0, errors.New("在庫がありません")
	}

	rand.Seed(time.Now().UnixNano())
	// rand.Intn(n)` は `[0, n)` の範囲で整数をランダム生成
	selected := items[rand.Intn(len(items))]

	fmt.Println("[Draw] 選ばれたPackItemID:", selected.PackItemID)
	fmt.Println("[Draw] 選ばれたアイテム:", selected.Item)

	if err := s.Repo.MarkItemUsed(selected.PackItemID); err != nil {
		return nil, 0, err
	}

	stock, err := s.Repo.CountRemainingItems(packID)
	if err != nil {
		return nil, 0, err
	}

	//*Item 型が必要なので、&selected.Item として アドレスを渡す必要がある
	return &selected.Item, stock, nil
}
