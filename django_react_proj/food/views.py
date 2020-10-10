from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Food
from .serializers import *


@api_view(['GET', 'POST'])
def food_list(request):
    if request.method == 'GET':
        data = Food.objects.all()

        serializer = FoodSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def food_detail(request, pk):
    try:
        food = Food.objects.get(pk=pk)
    except Food.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = FoodSerializer(food, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        food.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)