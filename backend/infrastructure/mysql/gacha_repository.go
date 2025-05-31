package mysql

import (
	"database/sql"
	"gacha-backend/domain/gacha"
	"log"
)

type GachaRepository struct {
	DB *sql.DB
}
func (r *GachaRepository) FindAvailableItems(packID int) ([]gacha.PackItem, error) {
	log.Printf("[DB] Searching available items for packID: %d", packID)

	rows, err := r.DB.Query(`
		SELECT pi.id AS pack_item_id,
		       i.id AS item_id,
		       i.name,
		       i.description,
		       i.image_url
		FROM pack_item pi
		JOIN item i ON pi.item_id = i.id
		WHERE pi.pack_id = ? AND pi.is_deleted = FALSE;
	`, packID)
	if err != nil {
		log.Printf("[DB Error] Query failed: %+v", err)
		return nil, err
	}
	defer rows.Close()

	var candidates []gacha.PackItem

	for rows.Next() {
		var packItemID int
		var item gacha.Item

		if err := rows.Scan(&packItemID, &item.ID, &item.Name, &item.Description, &item.ImageURL); err != nil {
			log.Printf("[Scan error] %+v", err)
			continue
		}

		candidates = append(candidates, gacha.PackItem{
			PackItemID: packItemID,
			Item:       item,
		})
		log.Printf("[Scan success] PackItemID: %d, ItemID: %d, Name: %s", packItemID, item.ID, item.Name)
	}

	log.Printf("[Result Length] %d items found", len(candidates))
	return candidates, nil
}

// func (r *GachaRepository) FindAvailableItems(packID int) ([]gacha.PackItem, error) {
// 	rows, err := r.DB.Query(`
// 		SELECT pi.id AS pack_item_id,
// 		       i.id AS item_id,
// 		       i.name,
// 		       i.rarity,
// 		       i.image_url
// 		FROM pack_item pi
// 		JOIN item i ON pi.item_id = i.id
// 		WHERE pi.pack_id = ? AND pi.is_deleted = FALSE;
// 	`, packID)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer rows.Close()
// 	log.Printf("[Rows Scan Start] packID: %d", packID)
	
// 	var result []gacha.PackItem
// 	for rows.Next() {
// 		var pi gacha.PackItem
// 		pi.Item = gacha.Item{}
	
// 		log.Println("[Before Scan]")
// 		err := rows.Scan(
// 			&pi.PackItemID,
// 			&pi.Item.ID,
// 			&pi.Item.Name,
// 			&pi.Item.Rarity,
// 			&pi.Item.ImageURL,
// 		)
// 		if err != nil {
// 			log.Printf("[Scan error] %+v", err)
// 			continue
// 		}
// 		log.Printf("[Scan success] %+v", pi)
// 		result = append(result, pi)
// 	}

// 	if err := rows.Err(); err != nil {
// 		log.Printf("[Rows iteration error] %+v", err)
// 	}
// 	log.Printf("[Query result raw check] got rows? %v", rows != nil)
// 	log.Printf("[Result Length] %d", len(result))
// 	return result, nil
// }


func (r *GachaRepository) MarkItemUsed(packItemID int) error {
	_, err := r.DB.Exec(`UPDATE pack_item SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?`, packItemID)
	return err
}

func (r *GachaRepository) CountRemainingItems(packID int) (int, error) {
	var count int
	err := r.DB.QueryRow(`
		SELECT COUNT(*) FROM pack_item
		WHERE pack_id = ? AND is_deleted = FALSE
	`, packID).Scan(&count)
	return count, err
}