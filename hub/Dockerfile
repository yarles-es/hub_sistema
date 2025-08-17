# -------- Stage 1: Build & Publish --------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Toletus.Hub.sln ./
COPY src/Toletus.Hub/Toletus.Hub.csproj src/Toletus.Hub/
COPY src/Toletus.Hub.API/Toletus.Hub.API.csproj src/Toletus.Hub.API/
RUN dotnet restore Toletus.Hub.sln

COPY . .

# 👇 força framework-dependent (sem host, sem single-file, sem RID)
RUN dotnet publish src/Toletus.Hub.API/Toletus.Hub.API.csproj \
    -c Release -o /app/out \
    -p:SelfContained=false \
    -p:UseAppHost=false \
    -p:PublishSingleFile=false

# -------- Stage 2: Runtime --------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_URLS=http://0.0.0.0:5110
ENV DOTNET_ENVIRONMENT=Production
EXPOSE 5110

COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "Toletus.Hub.API.dll"]
