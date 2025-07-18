package http

import (
	"net/http"
	"strconv"

	"gacha-backend/domain/pack"

	"github.com/gin-gonic/gin"
)

func NewPackHandler(r *gin.Engine, svc *pack.Service) {
	r.GET("/api/packs", func(c *gin.Context) {
		packs, err := svc.GetAllPacks()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, packs)
	})

	r.GET("/api/packs/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		pack, err := svc.GetPackByID(id)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		c.JSON(http.StatusOK, pack)
	})

	r.GET("/api/packs/:id/items", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		items, err := svc.GetPackItems(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, items)
	})
}
